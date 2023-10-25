import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifItemPageRoutingModule } from './modif-item-routing.module';

import { ModifItemPage } from './modif-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifItemPageRoutingModule
  ],
  declarations: [ModifItemPage]
})
export class ModifItemPageModule {}
