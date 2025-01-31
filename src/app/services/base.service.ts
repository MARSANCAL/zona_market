
import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDoc, setDoc, updateDoc, deleteDoc, DocumentReference, query, where, getDocs } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, from } from 'rxjs';
import { HashingService } from '../services/hashing.service';
import { environment } from 'src/environments/environment.prod';

import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor(private hashingService: HashingService) {}

  // Verificar si un usuario existe
  async checkUserExists(email: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Devuelve true si hay al menos un documento
  }

  // Registrar usuario con Google
  async registerGoogleUser(email: string, password: string, verificado: boolean): Promise<any> {
    const userExists = await this.checkUserExists(email);
    if (userExists) {
      throw new Error('El usuario ya está registrado');
    }

    // Generar una sal única
    const salt = uuidv4(); // Usar uuid para generar un salt único

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await this.hashingService.hashPassword(password, salt);

    // Insertar el usuario en la base de datos
    const userDoc = doc(this.firestore, `users/${uuidv4()}`);
    await setDoc(userDoc, {
      email,
      password: hashedPassword,
      verificado,
      salt,
    });

    // Enviar la contraseña sin hashing al correo del usuario
    await this.sendEmail(email, password);

    return { success: true };
  }

  // Método para enviar el correo usando EmailJS
  async sendEmail(email: string, password: string): Promise<void> {
    const templateParams = {
      to_name: email,
      password,
    };

    try {
      const response = await emailjs.send(
        'service_55pgf7g',
        'template_rd8xs18',
        templateParams,
        'myh6jilHRl1Qg8DMJ'
      );
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Error al enviar el correo.');
    }
  }

  // Otros métodos (ya están correctos)...
  getDocument<tipo>(enlace: string, documentId: string) {
    const documentRef = doc(this.firestore, `${enlace}/${documentId}`) as DocumentReference<tipo>;
    return getDoc(documentRef);
  }

  getDocumentChanges<tipo>(enlace: string, documentId: string): Observable<tipo> {
    const document = doc(this.firestore, `${enlace}/${documentId}`);
    return docData(document) as Observable<tipo>;
  }

  getCollectionChanges<tipo>(path: string): Observable<tipo[]> {
    const refCollection = collection(this.firestore, path);
    return collectionData(refCollection) as Observable<tipo[]>;
  }

  createDocument(data: any, enlace: string, documentId: string) {
    const document = doc(this.firestore, `${enlace}/${documentId}`);
    return setDoc(document, data);
  }

  updateDocument(data: any, enlace: string, documentId: string) {
    const document = doc(this.firestore, `${enlace}/${documentId}`);
    return updateDoc(document, data);
  }

  deleteDocument(enlace: string, documentId: string) {
    const document = doc(this.firestore, `${enlace}/${documentId}`);
    return deleteDoc(document);
  }

  createIdDoc() {
    return uuidv4();
  }
}
