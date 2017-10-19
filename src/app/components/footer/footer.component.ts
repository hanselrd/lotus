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
  cssClass: string;

  constructor(public authService: AuthService) {
    authService.authState
      .subscribe(auth => {
        if (auth !== null) {
          authService.user
            .subscribe(user => {
              // if (user.isRoot()) {
              //   this.cssClass = 'text-primary';
              // } else if (user.isAdmin()) {
              //   this.cssClass = 'text-danger';
              // }
              console.log(user);
              // console.log('sub', user.isSubscriber());
              // console.log('mod', user.isModerator());
              // console.log('admin', user.isAdministrator());
              // console.log('root', user.isRoot());
            });
        }
      });
  }

  ngOnInit() {
  }

}
