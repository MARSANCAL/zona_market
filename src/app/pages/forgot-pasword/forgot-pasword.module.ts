import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPaswordPageRoutingModule } from './forgot-pasword-routing.module';

import { ForgotPaswordPage } from './forgot-pasword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ForgotPaswordPageRoutingModule
  ],
  declarations: [ForgotPaswordPage]
})
export class ForgotPaswordPageModule {}
