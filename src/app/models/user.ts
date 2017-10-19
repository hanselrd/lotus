import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import { Role, RoleData } from './role';

export interface UserData {

  id?: string;
  providers?: firebase.UserInfo[];
  platform?: string;
  role?: Role;
  displayName?: string;
  ip?: string;

}

export class User {

  private _role: number;

  constructor(auth: firebase.User,
              public data: UserData) {
    if (this.hasRole()) {
      ((this.data.role as any) as firebase.firestore.DocumentReference).get()
        .then(roleDoc => {
          let role = new Role(roleDoc.data() as RoleData);
          role.data.id = roleDoc.id;
          this.data.role = role;
          this._role = Number.parseInt(roleDoc.id, 10);
        });
    }

    this.data.providers = auth.providerData
      .map(provider => {
        let obj = {
          displayName: provider.displayName,
          email: provider.email,
          phoneNumber: provider.phoneNumber,
          photoURL: provider.photoURL,
          uid: provider.uid
        } as firebase.UserInfo;

        Object.keys(obj).forEach(key => {
          !obj[key] && delete obj[key];
        });

        return obj;
      });

    this.data.platform = window.navigator.platform;
  }

  hasRole() {
    return (this.data.role)? true : false;
  }

  // isSubscriber() {
  //   return this._role >= 1;
  // }

  // isModerator() {
  //   return this._role >= 2;
  // }

  // isAdministrator() {
  //   return this._role >= 3;
  // }

  // isRoot() {
  //   return this._role >= 4;
  // }

}
