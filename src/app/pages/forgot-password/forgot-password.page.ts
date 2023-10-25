import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  folmularioForgot: FormGroup;

  constructor(public fb: FormBuilder, 
    public navCtrl: NavController,
    private alertController: AlertController) {

      this.folmularioForgot = this.fb.group({
        'email' : new FormControl("",Validators.required),
      })
    }

  async presentAlert() {
    let formulario = this.folmularioForgot.value;

    if (formulario.email == "" ){
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos' ,
        message: 'Debe llenar los campos',
        buttons: [ 'Reintentar' ]
      });
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Enviado',
      message: 'Mensaje de correo para cambiar su contraseña',
      buttons: ['OK'],
    });

    await alert.present();
    
  }

}
