import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMercadoPageRoutingModule } from './edit-mercado-routing.module';

import { EditMercadoPage } from './edit-mercado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMercadoPageRoutingModule
  ],
  declarations: [EditMercadoPage]
})
export class EditMercadoPageModule {}
