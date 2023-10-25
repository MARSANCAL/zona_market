import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { ServiceRestService } from 'src/app/services/service-rest.service';

@Component({
  selector: 'app-edit-mercado',
  templateUrl: './edit-mercado.page.html',
  styleUrls: ['./edit-mercado.page.scss'],
})
export class EditMercadoPage implements OnInit {

  mercados: any;

  mercado:any ={
    id:null,
    nombre:"",
    tipo:"",
    pais:"",
    coordenada:""

  }
  
  constructor( private activateRouter:ActivatedRoute, private router: Router, private api: ServiceRestService, private toastController: ToastController) { }

  getIdFromUrl(){
    let url= this.router.url;
    let arr = url.split('/',3);
    let id = parseInt(arr[2])
    return id;
  }
  ngOnInit() {
    this.getMercadoId(this.getIdFromUrl());
  }

  updateMercado(){
    this.api.updateMercado(this.mercado.id, this.mercado).subscribe({
      next: (() =>{
        console.log("Actualizardo correctamente: "+this.mercado);
        this.getMercadosList();
        this.presentToast({
          message: 'Datos del mercado actualizados, redirigiendo al Favoritos',
          duration: 3500,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        this.router.navigateByUrl('home/favorito');
      }),
      error: (error => {
        console.log("Error "+ error)
      })
    })
  }

  // get all mercados
  getMercadosList(){
    this.api.getMercadosList().subscribe((data) =>{
      console.log(data);
      this.mercados = data;
    });
  }

  //get x id

  getMercadoId(id: any){
    this.api.getMercadoId(id).subscribe((data) => {
      console.log(data);
      this.mercado = data
    })
  }

   //toastController
   
   async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
   } 
}
