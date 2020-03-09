import {City} from "./city";
import Entity from "../entity";

export class Address extends Entity {
  public street = '';
  public number = '';
  public city: City = null;

  constructor(value: Partial<Address> = {}) {
    super();
    Object.assign(this, value);
    if (this.city)
      this.city = new City(this.city);
  }

  toString(): string {
    return this.street + ' ' + this.number + ', ' + this.city.toString();
  }

}
