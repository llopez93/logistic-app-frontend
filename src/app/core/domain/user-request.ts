/**
 * Created by Lauta on 26/09/2017.
 */

import Entity from "./entity";
import {Ministry} from "../../user-profile/domain/ministry/ministry";


export class UserRequest extends Entity {

  public id: number = null;
  public username: string = "";
  public firstname: string = "";
  public lastname: string = "";
  public dni: string = "";
  public email: string = "";
  public phone: string = "";
  public createTime: number;
  public ministry: Ministry;
  public workplace: string = null;

  constructor(value: Object = {}) {
    super();
    Object.assign(this, value);
    if (this.ministry) this.ministry = new Ministry(this.ministry);
  }
}
