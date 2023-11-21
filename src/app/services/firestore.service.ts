import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private database: AngularFirestore) { }

  crearDoc(data: any, path: string, id: string){
    const colection = this.database.collection(path);
    return colection.doc(id).set(data);
  }

  getDoc ( path: string, id: string){
    const colection = this.database.collection(path);
    return colection.doc(id).valueChanges();
  }

  deleteDoc ( path: string, id: string){
    const colection = this.database.collection(path);
    return colection.doc(id).delete();
  }

  updateDoc (data: any, path: string, id: string) {
    const colection = this.database.collection(path);
    return colection.doc(id).update(data)
  }

  getId(){
    return this.database.createId();
  };
    

  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
    };
}
