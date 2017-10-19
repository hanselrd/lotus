import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: Date = new Date();
  roleColor: string;
  roleName: string;

  constructor(public authService: AuthService) {
    authService.authState
      .subscribe(auth => {
        if (auth !== null) {
          authService.user.data
            .subscribe(userData => {
              if (userData.role.data) {
                userData.role.data
                  .subscribe(roleData => {
                    if (roleData) {
                      this.roleColor = roleData.color;
                      this.roleName = roleData.name;
                    }
                  });
              }
            });
        }
      });
  }

  ngOnInit() {
  }

}
