export interface RoleData {

  id?: string;
  name: string;
  color: string;

}

export class Role {

  constructor(public data: RoleData) { }

}
