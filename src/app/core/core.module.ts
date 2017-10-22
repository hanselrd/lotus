import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './firebase.config';

import { AuthGuard } from './guards/auth/auth.guard';
import { GuestGuard } from './guards/guest/guest.guard';

import { AuthService } from './services/auth/auth.service';
import { ElectronService } from './services/electron/electron.service';
import { ElectronHwidService } from './services/electron-hwid/electron-hwid.service';
import { IpService } from './services/ip/ip.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()
  ],
  declarations: [],
  providers: [
    AuthService,
    ElectronService,
    ElectronHwidService,
    IpService,
    AuthGuard,
    GuestGuard
  ]
})
export class CoreModule { }
