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
  }

  get data() {
    return this._data;
  }

}
