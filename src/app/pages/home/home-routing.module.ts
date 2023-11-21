import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CompbuscarComponent } from 'src/app/components/compbuscar/compbuscar.component';
import { CompfavoritosComponent } from 'src/app/components/compfavoritos/compfavoritos.component';
import { CompinformacionComponent } from 'src/app/components/compinformacion/compinformacion.component';
import { CompcomentarioComponent } from 'src/app/components/compcomentario/compcomentario.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'buscador',
        component: CompbuscarComponent
      },
      {
        path: 'favorito',
        component: CompfavoritosComponent
      },
      {
        path: 'comercios',
        component: CompcomentarioComponent
      },
      {
        path: 'mas',
        component: CompinformacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
