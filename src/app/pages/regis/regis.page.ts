import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/clientes';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.page.html',
  styleUrls: ['./regis.page.scss'],
})
export class RegisPage {

  loading: any;

  cliente: Cliente = {
      uid: '',
      nombre: '',
      celular: '',
      email: ''
    };
  
    constructor(
      public alertController: AlertController,
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public firebaseAuthService: FirebaseauthService,
      public firestorService: FirestoreService  ) { }
  
    async ngOnInit() {
      
    }
  
    async registrarUser() {
      const crede = {
        email: this.cliente.email,
        password: this.cliente.celular,
      };
  
      try {
        const ress = await this.firebaseAuthService.register(crede.email, crede.password)
        .catch(err => console.log('Failed to register',err));
        console.log('eror ->', ress);
        const uid = await this.firebaseAuthService.getUid();
        this.cliente.uid = uid;
        this.guardarUser();
        console.log(uid);
      } catch (error) {
        console.log('Error detallado:' + error);
        console.error('Error al registrar usuario en el componente:', error);
      }
  
    }
  
      async guardarUser(){
        const path ='Clientes';
        const name =this.cliente.nombre;
        this.firestorService.crearDoc(this.cliente,path,this.cliente.uid)
        .then( res =>{
          console.log('guardado con exito');
        }).catch(error =>{});
      }
  
    async salir() {
      //const uid = await this.firebaseAuthService.getUid();
      //console.log(uid);
      this.firebaseAuthService.logout();
    }
  
    async openLoading() {
      this.loading = await this.loadingCtrl.create({
        cssClass: "my-custom-class",
        message: "Cargando...",
      });
      await this.loading.present();
    }

}
