import { Component /*, ViewChildren, ElementRef*/ } from '@angular/core';
import { /*IonItem,*/ AnimationController,ToastController, ToastOptions } from '@ionic/angular';
//import type {QueryList} from '@angular/core';
//import type {Animation} from '@ionic/angular';

import { ServiceRestService } from 'src/app/services/service-rest.service';
@Component({
  selector: 'app-compfavorito',
  templateUrl: './compfavorito.component.html',
  styleUrls: ['./compfavorito.component.scss'],
})
export class CompfavoritoComponent  {

  /*@ViewChildren(IonItem, { read: ElementRef }) 
  cardElements!: QueryList<ElementRef<HTMLIonItemElement>>;

  private animation!: Animation;
  private animation1!: Animation;
*/
  mercados:any;
  mercado:any ={
    id:null,
    nombre:"",
    tipo:"",
    pais:"",
    coordenada:""

  }

  constructor(private animationCtrl: AnimationController,
    private api: ServiceRestService,
    private toastController: ToastController) {
    }

/**animacion 
  ngAfterViewInit() {
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.first!.nativeElement)
      .duration(2000)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .onFinish(() =>{
        card.direction('reverse');
        card.play();
      });

    this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);

    const card1 = this.animationCtrl
      .create()
      .addElement(this.cardElements.first!.nativeElement)
      .duration(2000)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .onFinish(() =>{
        card1.direction('reverse');
        card1.play();
  });

  
  this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);
  
  this.animation1 = this.animationCtrl.create().duration(2000).addAnimation([card1]);
  }

  play() {
    this.animation.play();
  }

  play1() {
    this.animation1.play();
  }

  icon: string = 'heart-outline';

  toggleIcon() {
    this.icon = (this.icon === 'heart-outline') ? 'heart' : 'heart-outline';
  }*/

  //limpoiar
  limpiar(){
    this.mercado.nombre ="";
    this.mercado.tipo ="";
    this.mercado.comuna ="";
    this.mercado.pais ="";
    this.mercado.coordenada ="";
  }
  
  ionViewWillEnter(){
    this.getMercadosList();
    this.limpiar();
  }
  
  // get all mercados
  getMercadosList(){
    this.api.getMercadosList().subscribe((data) =>{
      console.log(data);
      this.mercados = data;
    });
  }

  //agregar mercado
   addMercado(){
    if (this.mercado.nombre == ""|| this.mercado.tipo == ""|| this.mercado.pais == ""|| this.mercado.comuna == ""|| this.mercado.coordenada ==""){
      this.presentToast({
        message: ' Error al registrar mercado, debe llenar todos los campos',
        duration: 3000,
        position: 'middle',
        icon: 'alert-circle-outline'
      });
      return;
    }else{
      this.api.addMercado(this.mercado).subscribe({
        next: (() => {
          console.log("Mercado Creado:"+ this.mercado)
          this.presentToast({ 
          message: 'Mercado creado ',
          duration: 3000,
          position: 'middle',
          icon: 'alert-circle-outline'
        });
        this.getMercadosList();
      })
    })
  }
}

  //get x id

  getMercadoId(id: any){
    this.api.getMercadoId(id).subscribe((data) => {
      console.log(data);
      this.mercado = data
    })
  }

  //delet merado
  deletMercado(id: any){
    this.api.deletMercado(id).subscribe({
    next: (() =>{
      this.presentToast({
        message: 'Mercado eliminado',
        duration: 3500,
        position: 'middle',
        icon: 'alert.cirlce-outline'
      }),
      console.log("Mercado eliminado");
      this.getMercadosList();
    }),
    error: (error => {
      console.log("Error"+ error)
    })
    })
  }
   //toastController
   
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
   }   
}
