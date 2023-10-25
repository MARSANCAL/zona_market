import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController,NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  folmularioLogin: FormGroup;

  user={
    nombre: "",
    password: ""
  }

  constructor(public fb: FormBuilder, 
    public navCtrl: NavController, 
    public alertController: AlertController, 
    private router: Router) { 

    this.folmularioLogin = this.fb.group({
      'nombre' : new FormControl("",Validators.required),
      'password' : new FormControl("",Validators.required),
    })}
  ngOnInit() {
  }
  async ingresar(){
    let formulario = this.folmularioLogin.value;

    if (formulario.nombre == "" || formulario.password == ""){
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos' ,
        message: 'Debe llenar los campos',
        buttons: [ 'Reintentar' ]
      });
      await alert.present();
      return;
    }
    //localstorage
    localStorage.setItem('ingresado','true');
    //state
    let navegationExtras : NavigationExtras = {
      state:{
        user:this.user
      }  
  }
    this.router.navigate(['/home/buscador'], navegationExtras);
  }

}
