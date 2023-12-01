import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

formularioLogin: FormGroup;
nombre: string = ''; 

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async ingresar() {
    let formulario = this.formularioLogin.value;

    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos almacenados en localStorage:', storedUserData);

    if (storedUserData && storedUserData.nombre === formulario.nombre && storedUserData.password === formulario.password) {
      this.nombre = storedUserData.nombre; // Asigna el nombre a la variable
      let navegationExtras: NavigationExtras = {
        state: {
          user: storedUserData
        }
      };
      this.router.navigate(['/home/buscador'], navegationExtras);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Debe llenar los campos',
        buttons: ['Reintentar']
      });
      await alert.present();
    }
  }
}