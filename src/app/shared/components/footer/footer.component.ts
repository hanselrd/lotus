import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: Date = new Date();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAboutDialog() {
    let dialogRef = this.dialog.open(AboutDialogComponent, {
      data: { message: 'hi from footer' }
    });
  }

}
