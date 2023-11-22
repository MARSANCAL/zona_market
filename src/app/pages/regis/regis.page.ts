import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/clientes';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.page.html',
  styleUrls: ['./regis.page.scss'],
})
export class RegisPage {

  loading: any;

  private path= 'Clientes/';

  id = this.firestorService.getId();
  nombre: number;
  celular: string;
  email: string;
  password: string;


    constructor(
      public alertController: AlertController,
      public navCtrl: NavController,
      public loadingCtrl: LoadingController, 
      public toastCtrl: ToastController,
      public firestorService: FirestoreService,
      public router: Router  ) { }
  
    async ngOnInit() {
      
    }
  
    async registrarUsuario() {
      const data ={
        nombre: this.nombre,
        celular:this.celular,
        email: this.email,
        password: this.password,
        id : this.id
      };
      this.openLoading();
      this.firestorService.crearDoc(data, this.path, data.id).then( res => {
        this.loading.dismiss();
        this.presentCtrl('Usuario Creado  con Exito!');

        localStorage.setItem('userData', JSON.stringify(data));

        this.router.navigate(['/inicio']);
      }).catch( error =>{
        this.presentCtrl('No fue posible guardar. Error: '+ error);
      });
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
