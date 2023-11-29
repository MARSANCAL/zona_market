import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Mercado } from 'src/app/interfaces/mercado';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-compcomentario',
  templateUrl: './compcomentario.component.html',
  styleUrls: ['./compcomentario.component.scss'],
})
export class CompcomentarioComponent  implements OnInit {
  
  mercados: Mercado [] = [];

  newm: Mercado;

  enableNewc =false;

  private path= 'Comentarios/';

  loading: any;
  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController ) { }

  ngOnInit() {
    this.getComentarios();
  }

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

  guardarComentario(){ 
    this.openLoading();   
    this.firestoreService.crearDoc(this.newm,this.path,this.newm.id).then( res => {
      this.loading.dismiss();
      this.presentCtrl('Guadado con Exito!');
      console.log( 'nfidnfiew' + this.newm, this.newm.id );
    }).catch( error =>{
      this.presentCtrl('No fue posible guardar. Error: '+ error);
    });

  }

  getComentarios(){
    this.firestoreService.getCollection<Mercado>(this.path).subscribe( res => {{
      this.mercados = res;
    }});
  }
  
  onPlaceChanged(event: any) {
    const place = event.place;
    if (place.geometry && place.geometry.location) {
      this.newm.ubicacion = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;
    }
  }
  async deleteComentario(m: Mercado){
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: 'Advertencia',
      message: 'Seguro que desea Eliminar este comentario',
      buttons: [
        {
          text: 'calcelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
        }
      }, {
        text:'OK',
        handler: () => {
          console.log('Confirm Okay');
          this.firestoreService.deleteDoc(this.path, m.id).then( res => {
            this.loading.dismiss();
            this.presentCtrl('Eliminado con Exito!');
            this.alertCtrl.dismiss();
          }).catch( error =>{
            this.presentCtrl('No fue posible guardar. Error: '+ error);
          });

        }
      }
      ]
    });
    await alert.present();
  }

  nuevo(){
    this.enableNewc = true;
    this.newm = {
      nombremer: '',
      tipomer: '',
      comunamer: '',
      descripcion: '',
      ubicacion: '',
      id: this.firestoreService.getId(),
    };
  }

  async openLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Cargando...",
    });
    await this.loading.present();
  }

  async presentCtrl(msg: string) {
    const toast = await this.toastCtrl.create({
      cssClass: "my-custom-class",
      message: msg,
      duration: 3000,
      color: "light"
    });
    toast.present();
  }
}
