import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ElectronService } from './services/electron.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
