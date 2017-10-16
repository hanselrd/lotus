import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  // private _userRef: AngularFireObject<User>;
  // private _user: Observable<User>;

  constructor(private afDb: AngularFireDatabase) {
    // authService.user
    //   .subscribe(auth => {
    //     if (auth !== null) {
    //       this._userRef = afDb.object(`users/${auth.uid}`);
    //       this._user = this._userRef.valueChanges();
    //       this._user.subscribe(user => {
    //         if (user === null) {
    //           this.createUser(new User(auth));
    //         }
    //       });
    //     }
    //   });
  }

  // get user() {
  //   return this._user;
  // }

  // createUser(user: User) {
  //   this._userRef.set(user)
  //     .catch(error => console.log(error));
  // }

  // updateUser(user: User) {
  //   this._userRef.update(user)
  //     .catch(error => console.log(error));
  // }

}
