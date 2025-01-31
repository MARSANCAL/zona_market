import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './guards/ingresado.guard';
//import { NoIngresadoGuard } from './guards/no-ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule) //,canActivate: [NoIngresadoGuard]

   },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) //,canActivate: [NoIngresadoGuard]
  },
  {
    path: 'register-google',
    loadChildren: () => import('./pages/register-google/register-google.module').then( m => m.RegisterGooglePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule) //,canActivate: [NoIngresadoGuard]
  },

  {
    path: 'edit-mercado/:id',
    loadChildren: () => import('./pages/edit-mercado/edit-mercado.module').then( m => m.EditMercadoPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule) //,canActivate: [NoIngresadoGuard]

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
