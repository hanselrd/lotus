import { Component } from '@angular/core';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService) {
    // authService.signInWithEmailAndPassword('test@test.com', 'tester')
    //   .then(() => {
    //     authService.user
    //       .subscribe(user => {
    //         console.log('user', user);
    //       });
    //   });
    authService.createUserWithEmailAndPassword('tester@test.com', 'tester')
      .then(() => {
        authService.user.subscribe(user => console.log('user', user));
      });
  }

}
