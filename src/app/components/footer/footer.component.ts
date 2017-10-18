import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: Date = new Date();
  cssClass: string;

  constructor(public authService: AuthService) {
    authService.authState
      .subscribe(auth => {
        if (auth !== null) {
          authService.user
            .subscribe(user => {
              if (user.access >= 1) {
                this.cssClass = 'text-danger';
              }
              if (user.access >= 2) {
                this.cssClass = 'text-primary';
              }
            });
        }
      });
  }

  ngOnInit() {
  }

}
