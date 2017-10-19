import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
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
        // let user = new User(this.afs, auth);
        // user.data.displayName = displayName;
        // user.data.ip = this.ipService.ip;
        // User.set(this.afs, auth.uid, user);



        // let user = new User(auth, {
        //   displayName,
        //   ip: this.ipService.ip
        // });
        // this.afs.doc(`users/${auth.uid}`).set(user.data)
        //   .catch(error => console.log(error));
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        let user = new User(this.afs, auth);
        user.data
          .subscribe(data => {
            data.ip = this.ipService.ip;
            User.update(this.afs, auth.uid, data);
          });
      });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
