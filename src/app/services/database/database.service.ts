import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user';

@Injectable()
export class DatabaseService {

  private _user: AngularFireObject<User> = null;

  constructor(private afDb: AngularFireDatabase,
              private authService: AuthService) {
    authService.user
      .subscribe(auth => {
        if (auth !== null) {
          this._user = afDb.object(`/users/${auth.uid}`);
          // this.user.$ref.transaction(currentValue => {
          //   if (currentValue === null) {
          //     return new User(auth);
          //   }
          // });
          this._user.snapshotChanges()
            .map(action => {
              action.payload.ref.transaction(currentValue => {
                if (currentValue === null) {
                  return new User(auth);
                }
              });
            });
        }
      });
  }

  get user() {
    return this._user.valueChanges();
  }

  createUser(user: User) {
    this._user.set(user)
      .catch(error => console.log(error));
  }

  updateUser(user: User) {
    this._user.update(user)
      .catch(error => console.log(error));
  }

}
