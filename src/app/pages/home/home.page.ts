import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, } from '@ionic/angular';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre: string = '';
  segmentoActual: string = 'buscador';
  userData: any;

  constructor(private activateRouter: ActivatedRoute,
     private router: Router, 
     private authService: AuthService,
     private alertController: AlertController) {
    this.activateRouter.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.nombre = this.userData.this.nombre
        console.log(this.userData);
      } else {
        this.router.navigate(['/inicio']);
      }
    });
  }
  
  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Estas Seguro?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Salir',
          cssClass: 'alert-button-cancal',
          handler: () => {
            this.redireccionarPagina();          
          }
        },
        {
          text: 'Volver',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }
  redireccionarPagina(){
    localStorage.removeItem('ingresado');
    this.router.navigate(['/inicio']);
  }
  segmentChanged($event:any){
    console.log($event);
    let direccion=$event.detail.value;
    this.router.navigate(['home/'+ direccion])
  }
}
