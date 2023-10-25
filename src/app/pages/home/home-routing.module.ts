import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CompbuscadorComponent } from 'src/app/components/compbuscador/compbuscador.component';
import { CompfavoritoComponent } from 'src/app/components/compfavorito/compfavorito.component';
import { CompmasComponent } from 'src/app/components/compmas/compmas.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'buscador',
        component: CompbuscadorComponent
      },
      {
        path: 'favorito',
        component: CompfavoritoComponent
      },
      {
        path: 'mas',
        component: CompmasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
