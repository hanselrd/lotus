import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private _user: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth) {
    this._user = this.afAuth.authState;
  }

  get user() {
    return this._user;
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => console.log('Registered successfully'))
      .catch(error => console.log(error));
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => console.log('Logged in successfully'))
      .catch(error => console.log(error));
  }

  logout() {
    return this.afAuth.auth.signOut()
      .then(() => console.log('Logged out successfully'))
      .catch(error => console.log(error));
  }

}
