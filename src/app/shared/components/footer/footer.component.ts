import { Component, OnInit } from '@angular/core';

import { AuthService, Role } from '@app/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: Date = new Date();
  roles: Role[];

  constructor(public authService: AuthService) {
    authService.authState
      .subscribe(auth => {
        if (auth !== null) {
          authService.user.data
            .subscribe(userData => {
              this.roles = userData.roles;
            });
        }
      });
  }

  ngOnInit() {
  }

}