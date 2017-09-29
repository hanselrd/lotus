import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { User } from '../../models/user';

@Injectable()
export class AuthService {

  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    afAuth.authState.switchMap(auth => {
      if (auth) {
        return db.object(`users/${auth.uid}`);
      } else {
        return Observable.of(null);
      }
    })
    .subscribe(user => {
      this._user.next(user);
    });
  }

  get user() {
    return this._user;
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.updateUser(user);
        console.log('Created user successfully');
      })
      .catch(error => console.log(error));
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => console.log('Signed in successfully'))
      .catch(error => console.log(error));
  }

  signOut() {
    return this.afAuth.auth.signOut()
      .then(() => console.log('Signed out successfully'))
      .catch(error => console.log(error));
  }

  get isSignedIn() {
    return (this.afAuth.auth.currentUser)? true : false;
  }

  // updates user after create accounts but only populates
  // fields that arent in auth
  private updateUser(auth) {
    const user = new User(auth);
    const ref = this.db.object(`users/${auth.uid}`);
    ref.take(1)
      .subscribe(() => {
        ref.update(user);
      });
  }

}
