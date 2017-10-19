import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

export interface IRole {

  id: number;
  name: string;
  color: string;

}

export class Role {

  private _doc: AngularFirestoreDocument<IRole>;
  private _data: Observable<IRole>;
  private _role: IRole;

  constructor(private afs: AngularFirestore,
              public id: number) {
    this._doc = afs.doc(`roles/${id}`);
    this._data = this._doc.snapshotChanges()
      .map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as IRole;
          const id = Number.parseInt(action.payload.id, 10);
          return { id, ...data };
        }
        return null;
      });
    this._data
      .subscribe(data => {
        this._role = data;
      });
  }

  get data() {
    return this._data;
  }

  isSub() {
    if (this._role) {
      return this._role.id >= 1;
    }
    return false;
  }

  isMod() {
    if (this._role) {
      return this._role.id >= 2;
    }
    return false;
  }

  isAdmin() {
    if (this._role) {
      return this._role.id >= 3;
    }
    return false;
  }

  isOwner() {
    if (this._role) {
      return this._role.id >= 4;
    }
    return false;
  }

}
