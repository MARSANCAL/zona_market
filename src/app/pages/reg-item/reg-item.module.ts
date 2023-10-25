import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegItemPageRoutingModule } from './reg-item-routing.module';

import { RegItemPage } from './reg-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegItemPageRoutingModule
  ],
  declarations: [RegItemPage]
})
export class RegItemPageModule {}
