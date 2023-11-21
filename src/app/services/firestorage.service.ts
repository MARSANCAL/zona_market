import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public fireStorage: AngularFireStorage ) { }

  uploadImage(file:any, path: string, nombre: string): Promise<string> {
    return new Promise(resolv  => {
      const filePath =  path +'/' + nombre;
      const  ref = this.fireStorage.ref(filePath);
      const taks = ref.put(file);
      resolv('este es el enlace');
      })
  }
}
