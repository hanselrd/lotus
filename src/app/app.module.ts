import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './firebase.config';

import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';
import { ElectronService } from './services/electron/electron.service';
import { ElectronHwidService } from './services/electron-hwid/electron-hwid.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      }
    ]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    DatabaseService,
    ElectronService,
    ElectronHwidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
