import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/material';

import { AboutDialogComponent } from './components/footer/about-dialog/about-dialog.component'; // remove
import { FooterComponent } from './components/footer/footer.component'; // remove
import { HeaderComponent } from './components/header/header.component'; // remove
import { PageComponent } from './components/page/page.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

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
    AboutDialogComponent,
    FooterComponent,
    HeaderComponent,
    PageComponent,
    SidenavComponent,
    CollapseDirective,
    CircularJsonPipe
  ],
  entryComponents: [
    AboutDialogComponent
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FooterComponent,
    HeaderComponent,
    PageComponent,
    SidenavComponent,
    CollapseDirective,
    CircularJsonPipe
  ]
})
export class SharedModule { }
