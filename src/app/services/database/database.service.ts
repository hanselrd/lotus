import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user';

@Injectable()
export class DatabaseService {

  user: FirebaseObjectObservable<User> = null;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    authService.user
      .subscribe(auth => {
        if (auth !== null) {
          this.user = db.object(`/users/${auth.uid}`);
          this.user.$ref.transaction(currentValue => {
            if (currentValue === null) {
              return new User(auth);
            }
          });
        }
      });
  }

  createUser(user: User) {
    this.user.set(user)
      .catch(error => console.log(error));
  }

  updateUser(user: User) {
    this.user.update(user)
      .catch(error => console.log(error));
  }

}
