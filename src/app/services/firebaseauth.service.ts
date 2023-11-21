import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {


  constructor( private auth: AngularFireAuth   ) { }

  async register(email: string, password: string) { 
    try {
      return await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error detallado:' + error);
      console.error('Error al registrar usuario:', error);
      throw error; // Propaga el error para que pueda ser manejado en el componente
    }
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut();
  }
  
  async getUid(){
    const user = await this.auth.currentUser;
    if (user == null){
      return null;
    }else{
      return user.uid;
    }
  }
}