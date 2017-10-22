import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { RoutingModule } from '@app/routing';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
