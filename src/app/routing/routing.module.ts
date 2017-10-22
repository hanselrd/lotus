import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
