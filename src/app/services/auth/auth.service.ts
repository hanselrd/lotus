import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  private _user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this._user = this.afAuth.authState;
  }

  get user() {
    return this._user;
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  isSignedIn() {
    return (this.afAuth.auth.currentUser)? true : false;
  }

}
