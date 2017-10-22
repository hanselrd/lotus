import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    RouterModule,
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
    RouterModule,
    MaterialModule,
    FooterComponent,
    NavbarComponent,
    PageComponent,
    CollapseDirective,
    CircularJsonPipe
  ]
})
export class SharedModule { }
