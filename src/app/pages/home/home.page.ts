import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data:any;
  
  constructor(private activateRouter: ActivatedRoute,
    private router: Router,
    public alertController: AlertController) {

      this.activateRouter.queryParams.subscribe(params =>{
        if (this.router.getCurrentNavigation()?.extras.state){
          this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
          console.log(this.data)
        }else{
          this.router.navigate(['/login']);
        }
      })}
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
    this.router.navigate(['/login']);
  }
  segmentChanged($event:any){
    console.log($event);
    let direccion=$event.detail.value;
    this.router.navigate(['home/'+ direccion])
  }



}
