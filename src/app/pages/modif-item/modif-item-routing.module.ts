import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifItemPage } from './modif-item.page';

const routes: Routes = [
  {
    path: '',
    component: ModifItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifItemPageRoutingModule {}
