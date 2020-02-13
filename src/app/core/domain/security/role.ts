import Entity from '../entity';

export class Role extends Entity {
  name = "";

  constructor(value: Partial<Role> = {}) {
    super();
    Object.assign(this, value);
  }

  public compareTo(role: Role): boolean {
    return this.name.toLocaleLowerCase() === role.name.toLocaleLowerCase();
  }

  public compareNameTo(roleName: string): boolean {
    return this.name.toLocaleLowerCase() === roleName.toLocaleLowerCase();
  }
}
