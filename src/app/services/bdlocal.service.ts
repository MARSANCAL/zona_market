import { Injectable } from '@angular/core';
import { Iagenda } from '../interfaces/iagenda';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BdlocalService {

  agenda: Iagenda[]=[];
  private _storage: Storage | null=null;
  constructor( private storage: Storage, public toastController:ToastController) {
    this.Init();
    this.cargarContactos();
   }

  async Init() {
    const storage=await this.storage.create();
    this._storage=storage
  }

  async cargarContactos() {
    const miAgenda= await this.storage.get('agenda');
    if (miAgenda) {
      this.agenda=miAgenda;
    }
  }
  
  guardarContacto(nombre: string, nro:number){
    const existe=this.agenda.find(c=>c.intNumero===nro);
    if (!existe) {
      this.agenda.unshift({strNombre:nombre, intNumero:nro});//permite insertar
      this._storage?.set('agenda', this.agenda);
      this.presentToast("Contacto agregado con EXITO!!!")
    }else{
      this.presentToast("Contacto Ya EXISTE!!!")
    }
  }

  async borrarContacto(nro:number){
    const existe=this.agenda.find(c=>c.intNumero===nro);
    if (existe) {
      this.agenda=this.agenda.filter(n=>n.intNumero !== nro);
      this._storage?.set('agenda', this.agenda);
      this.presentToast("Contacto eliminado con EXITO!!!")
    }else{
      this.presentToast("Contacto NO EXISTE!!!")
    }
  }

  async borrarBD(){
    await this._storage?.clear();
    this.agenda=[];
    this.presentToast("BD Eliminada!!!")
  }

  retornarAgenda(){
    return this.agenda;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }
}
