import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { IUser, User } from '../../models/user';
import { IpService } from '../ip/ip.service';

@Injectable()
export class AuthService {

  private _authState: Observable<firebase.User>;
  private _user: User;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private ipService: IpService) {
    this._authState = afAuth.authState;
    this._authState.subscribe(auth => {
      if (auth !== null) {
        this._user = new User(afs, auth);
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
        let data = {} as IUser;
        data.displayName = displayName;
        data.ip = this.ipService.ip;
        data.platform = window.navigator.platform;
        data.providers = JSON.parse(JSON.stringify(auth.providerData));
        User.set(this.afs, auth.uid, data);
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        let user = new User(this.afs, auth);
        user.data
          .subscribe(data => {
            data.ip = this.ipService.ip;
            data.platform = window.navigator.platform;
            User.update(this.afs, auth.uid, data);
          });
      });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
