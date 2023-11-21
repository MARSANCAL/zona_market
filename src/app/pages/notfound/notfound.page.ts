import { Component, ViewChildren, ElementRef} from '@angular/core';
import { IonCard, AnimationController } from '@ionic/angular';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotfoundPage {

  
  @ViewChildren(IonCard, { read: ElementRef }) 
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  private animation!: Animation;

  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(0)!.nativeElement)
      .fill('none')
      .duration(2000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);
  }

  play() {
    this.animation.play();
  }

}
