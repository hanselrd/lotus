import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ElectronService } from './services/electron.service';
import { HwidService } from './services/electron/hwid.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ElectronService,
    HwidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
