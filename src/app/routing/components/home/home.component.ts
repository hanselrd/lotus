import { Component, OnInit } from '@angular/core';

import { AuthService, IpService, Role, User } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  roles: Role[];

  constructor(public authService: AuthService,
              public ipService: IpService) {
    this.user = authService.user;
    authService.user.data
      .subscribe(userData => {
        this.roles = userData.roles;
      });
  }

  ngOnInit() {
  }

}
