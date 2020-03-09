import {Province} from './province';
import Entity from "../entity";

export class City extends Entity {
  public name = '';
  public province: Province = null;

  constructor(value: Partial<City> = {}) {
    super();
    Object.assign(this, value);
    if (this.province)
      this.province = new Province(this.province);
  }

  public toString(): string {
    return this.name + ', ' + this.province.name;
  }

  compareTo(c: City): boolean {
    return c && (this.name === c.name) && this.province.compareTo(c.province);
  }

}
