import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CompbuscarComponent } from 'src/app/components/compbuscar/compbuscar.component';
import { CompfavoritosComponent } from 'src/app/components/compfavoritos/compfavoritos.component';
import { CompinformacionComponent } from 'src/app/components/compinformacion/compinformacion.component';
import { CompcomentarioComponent } from 'src/app/components/compcomentario/compcomentario.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CompbuscarComponent, CompfavoritosComponent, CompcomentarioComponent, CompinformacionComponent]
})
export class HomePageModule {}
