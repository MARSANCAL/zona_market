import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMercadoPage } from './edit-mercado.page';

const routes: Routes = [
  {
    path: '',
    component: EditMercadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMercadoPageRoutingModule {}
