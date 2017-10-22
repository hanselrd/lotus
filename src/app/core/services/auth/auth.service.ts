import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/throttleTime';

import { IpService } from '../ip/ip.service';
import { IUser, User } from '../../models/user';

@Injectable()
export class AuthService {

  private _authState: Observable<firebase.User>;
  private _user: User;
  private _statusRef: firebase.database.Reference;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase,
              private afs: AngularFirestore,
              private ipService: IpService) {
    this._authState = afAuth.authState;
    this._authState
      .do(auth => {
        if (auth) {
          this._statusRef = firebase.database().ref(`status/${auth.uid}`);
          firebase.database().ref('.info/connected')
            .on('value', (snapshot) => {
              if (snapshot.val() == false) return;
              this._statusRef.onDisconnect()
                .set({ status: 'offline', lastUpdated: firebase.database.ServerValue.TIMESTAMP })
                .then(() => {
                  this._updateStatus('online');
                });
            });
        }
      })
      .subscribe(auth => {
        if (auth) {
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
            this._updateStatus('online');
          });
      });
  }

  logout() {
    this._updateStatus('offline');
    return this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['login']));
  }

  private _updateStatus(status: string) {
    this._statusRef.set({ status, lastUpdated: firebase.database.ServerValue.TIMESTAMP });
  }

}
