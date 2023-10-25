import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegItemPage } from './reg-item.page';

const routes: Routes = [
  {
    path: '',
    component: RegItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegItemPageRoutingModule {}
