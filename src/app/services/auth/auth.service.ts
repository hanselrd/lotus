import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { User, UserData } from '../../models/user';
import { IpService } from '../ip/ip.service';

@Injectable()
export class AuthService {

  private _authState: Observable<firebase.User>;
  private _userDoc: AngularFirestoreDocument<UserData>;
  private _user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private ipService: IpService) {
    this._authState = afAuth.authState;
    this._authState.subscribe(auth => {
      if (auth !== null) {
        this._userDoc = afs.doc(`users/${auth.uid}`);
        this._user = this._userDoc.snapshotChanges()
          .map(action => {
            let user = new User(auth, action.payload.data() as UserData);
            user.data.id = action.payload.id;
            return user;
          });
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
        let user = new User(auth, {
          displayName,
          ip: this.ipService.ip
        });
        this.afs.doc(`users/${auth.uid}`).set(user.data)
          .catch(error => console.log(error));
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        let user = new User(auth, {
          ip: this.ipService.ip
        });
        this.afs.doc(`users/${auth.uid}`).update(user.data)
          .catch(error => console.log(error));
      });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  update(user: User) {
    return this._userDoc.update(user.data);
  }

}
