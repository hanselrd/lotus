import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
