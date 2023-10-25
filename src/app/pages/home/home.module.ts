import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CompbuscadorComponent } from 'src/app/components/compbuscador/compbuscador.component';
import { CompfavoritoComponent } from 'src/app/components/compfavorito/compfavorito.component';
import { CompmasComponent } from 'src/app/components/compmas/compmas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CompbuscadorComponent, CompfavoritoComponent, CompmasComponent]
})
export class HomePageModule {}
