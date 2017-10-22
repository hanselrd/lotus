import { Routes } from '@angular/router';

import { AuthGuard, GuestGuard } from '@app/core';

import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [GuestGuard]
  }
];
