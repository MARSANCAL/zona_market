import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.page.html',
  styleUrls: ['./forgot-pasword.page.scss'],
})
export class ForgotPaswordPage {
  formularioForgot: FormGroup;
  email: string = '';
  isSubmitting: boolean = false;

  constructor(
    public fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.formularioForgot = this.fb.group({
      'email': new FormControl("", Validators.required),
    });

    this.initializeEmailJS();
  }

  initializeEmailJS() {
    emailjs.init('Wv9iRbxhPyQHtDw8y'); // Reemplaza con tu User ID de EmailJS
  }

  async sendEmail() {
    this.isSubmitting = true;
    let formulario = this.formularioForgot.value;
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.email === formulario.email) {
      this.email = storedUserData.email;
    } else {
      this.showAlert('Datos Incorrectos', 'Debe llenar los campos o ingresar un usuario existente');
      this.isSubmitting = false;
      return;
    }

    const params = {
      from_name: 'Zona Mercado',
      to_name: formulario.email,
    };

    try {
      await emailjs.send('service_8e6u81j', 'template_9i5xk9a', params); // Reemplaza con tu Service ID y Template ID
      this.showAlert('Correo electrónico enviado:', 'Mensaje de Correo  enivado para cambiar su contraseña');
    } catch (error) {
      this.showAlert('Error al enviar el correo electrónico:', 'Hubo un problema al enviar el correo electrónico. Por favor, inténtalo de nuevo.');
    } finally {
      this.isSubmitting = false;
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
  }
      