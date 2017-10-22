import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { MaterialModule } from '@app/material';

import { FooterComponent } from './components/footer/footer.component'; // remove
import { NavbarComponent } from './components/navbar/navbar.component'; // remove
import { PageComponent } from './components/page/page.component';

import { CollapseDirective } from './directives/collapse/collapse.directive';

import { CircularJsonPipe } from './pipes/circular-json/circular-json.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    MaterialModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    PageComponent,
    CollapseDirective,
    CircularJsonPipe
  ],
  exports: [
    ReactiveFormsModule,
    FlashMessagesModule,
    MaterialModule,
    FooterComponent,
    NavbarComponent,
    PageComponent,
    CollapseDirective,
    CircularJsonPipe
  ]
})
export class SharedModule { }
