import Entity from '../entity';
import {FX} from './fx';
import {Role} from './role';

export default class User extends Entity {
  //username = "";
  firstName = "";
  lastName = "";
  email = "";
  enabled = true;
  //profilePhoto = '';
  //fxs: FX[] = [];
  role: Role = new Role();

  constructor(value: Partial<User> = {}) {
    super();
    Object.assign(this, value);
    if (this.role)
      this.role = new Role(this.role);
  }

  public addFxs(fxs: FX[]) {
    //this.fxs.concat(fxs.filter(fx => !this.fxs.some(f => f.equals(fx))));
  }

  public removeFxs(fxs: FX[]) {
    //this.fxs = this.fxs.filter(fx => !fxs.some(f => f.equals(fx)));
  }

  public getFullName(): string {
    return this.firstName + " " + this.lastName;
  }

  public hasFx(fxname: string): boolean {
    return false;//this.fxs.some(fx => fx.fxname === fxname);
  }

  public hasRole(roleName: string): boolean {
    return this.role.compareNameTo(roleName);
  }
}
