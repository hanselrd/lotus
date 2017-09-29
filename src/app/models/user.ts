import * as firebase from 'firebase/app';

export class User {
  uid: string;
  email: string;
  phoneNumber: string;
  displayName: string;
  providers: firebase.UserInfo[];
  access: number;

  constructor(auth: firebase.User) {
    this.uid = auth.uid;
    this.email = auth.email;
    this.phoneNumber = auth.phoneNumber;
    this.displayName = auth.displayName;
    this.providers = auth.providerData;
  }
}
