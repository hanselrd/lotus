import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

@Injectable()
export class AuthService {

  private _authState: Observable<firebase.User>;
  private _user: Observable<User>;
  private _userRef: AngularFireObject<User>;

  constructor(private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase) {
    this._authState = afAuth.authState;
    this._authState.subscribe(auth => {
      if (auth !== null) {
        this._userRef = afDb.object(`users/${auth.uid}`);
        this._user = this._userRef.valueChanges();
      }
    });
  }

  get authState() {
    return this._authState;
  }

  get user() {
    return this._user;
  }

  register(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(auth => {
        const user = new User(auth);
        user.displayName = displayName;
        this.afDb.object(`users/${auth.uid}`).set(user);
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  update(user: User) {
    return this._userRef.update(user);
  }

}
