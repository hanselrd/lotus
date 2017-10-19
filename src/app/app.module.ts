import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './firebase.config';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { RoutingModule } from './modules/routing/routing.module';
import { CollapseDirective } from './directives/collapse.directive';
import { AuthService } from './services/auth/auth.service';
import { ElectronService } from './services/electron/electron.service';
import { ElectronHwidService } from './services/electron-hwid/electron-hwid.service';
import { IpService } from './services/ip/ip.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CollapseDirective,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    FlashMessagesModule
  ],
  providers: [
    AuthService,
    ElectronService,
    ElectronHwidService,
    IpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
