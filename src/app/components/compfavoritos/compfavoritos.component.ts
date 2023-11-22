import { Component , ViewChildren, ElementRef } from '@angular/core';
import { IonItem, AnimationController,ToastController, ToastOptions } from '@ionic/angular';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';


@Component({
  selector: 'app-compfavoritos',
  templateUrl: './compfavoritos.component.html',
  styleUrls: ['./compfavoritos.component.scss'],
})
export class CompfavoritosComponent  {

  @ViewChildren(IonItem, { read: ElementRef }) 
  cardElements!: QueryList<ElementRef<HTMLIonItemElement>>;

  private animation!: Animation;
  private animation1!: Animation;



  constructor(private animationCtrl: AnimationController,
    private toastController: ToastController) {
    }
    public isDisabled = true;

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
      console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
      ev.detail.complete();
    }
  
    toggleReorder() {
      this.isDisabled = !this.isDisabled;
    }

animacion 
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
      .fromTo('transform', 'translateX(0px)', 'translateX(-30%)')
      .fromTo('opacity', '1', '0.2')
      .onFinish(() =>{
        //card1.direction('reverse');
        //card1.play();
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
  }


}
