import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth/auth.guard';
import { GuestGuard } from '../../guards/guest/guest.guard';
import { CircularJsonPipe } from './../../pipes/circular-json/circular-json.pipe';
import { PageComponent } from '../../components/page/page.component';
import { HomeComponent } from '../../components/home/home.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

const routes: Routes = [
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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [
    CircularJsonPipe,
    PageComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  providers: [
    AuthGuard,
    GuestGuard
  ]
})
export class RoutingModule { }
