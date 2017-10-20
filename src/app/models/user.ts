import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { Role } from './role';

export interface IUser {

  id: string;
  providers: firebase.UserInfo[];
  platform: string;
  roles: Role[];
  displayName: string;
  ip: string;

}

export class User {

  private _doc: AngularFirestoreDocument<IUser>;
  private _data: Observable<IUser>;

  constructor(private afs: AngularFirestore,
              auth: firebase.User) {
    this._doc = afs.doc(`users/${auth.uid}`);
    this._data = this._doc.snapshotChanges()
      .map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as IUser;
          const id = action.payload.id;
          if (data.roles != null) {
            data.roles.forEach((role, index, roles) => {
              roles[index] = new Role(afs, role as any);
            });
          }
          return { id, ...data };
        }
        return null;
      });
  }

  get data() {
    return this._data;
  }

  static set(afs: AngularFirestore, id: string, data: IUser) {
    delete data.id;
    if (data.roles) {
      data.roles.forEach((role, index, roles) => {
        roles[index] = role.id as any;
      });
    }
    afs.doc(`users/${id}`).set(data);
  }

  static update(afs: AngularFirestore, id: string, data: Partial<IUser>) {
    delete data.id;
    if (data.roles) {
      data.roles.forEach((role, index, roles) => {
        roles[index] = role.id as any;
      });
    }
    afs.doc(`users/${id}`).update(data);
  }

}
