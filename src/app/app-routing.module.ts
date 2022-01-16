import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'index',
    component: CuerpoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'crudUser',
    component: CrudUserComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'error',
    component: NotFoundComponent
  }, {
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
