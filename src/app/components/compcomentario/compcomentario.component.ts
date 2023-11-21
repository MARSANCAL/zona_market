import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Mercado } from 'src/app/interfaces/mercado';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';


@Component({
  selector: 'app-compcomentario',
  templateUrl: './compcomentario.component.html',
  styleUrls: ['./compcomentario.component.scss'],
})
export class CompcomentarioComponent  implements OnInit {
  
  mercados: Mercado [] = [];

  newm: Mercado;

  newI = '';

  enableNewc =false;

  private path= 'Comentarios/';

  loading: any;
  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public firestoregeService: FirestorageService ) { }

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
      console.log( 'nfidnfiew' + this.newm, this.newI, this.newm.id );
    }).catch( error =>{
      this.presentCtrl('No fue posible guardar. Error: '+ error);
    });

  }

  getComentarios(){
    this.firestoreService.getCollection<Mercado>(this.path).subscribe( res => {{
      this.mercados = res;
    }});
  }
  async newImageUpload(event: any) {
    try {
      const path = 'Comentarios';
      const name = 'prueba';
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        // Usar una promesa para esperar la carga del archivo
        const fileLoadPromise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };
  
          reader.onerror = (error) => {
            reject(error);
          };
  
          reader.readAsDataURL(file);
        });
  
        // Esperar a que el archivo se cargue antes de continuar
        const fileDataUrl: string = await fileLoadPromise;
  
        // Llamar a la función de carga de imagen
        const res = await this.firestoregeService.uploadImage(fileDataUrl, path, name);
  
        console.log('Recibir res de la promesa', res);
        console.log('Fin de la función -> newImageUpload');
      } else {
        console.error('No se ha seleccionado ningún archivo.');
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  }
 /* async newImageUpload(event: any){
    /*if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = ((image) =>{
        this.newI = image.target.result as string;
      });
      reader.readAsDataURL(event.target.file[0]);
      console.log(reader.result);
    }*/
   /* const path = 'Comentarios';
    const name= 'prueba';
    const file = event.target.files[0];
    const res = await this.firestoregeService.uploadImage(file, path, name)
      console.log('recibir res de la promesa', res);
      console.log('fin de la funcione ->newI');

  }*/

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
      foto: '',
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
