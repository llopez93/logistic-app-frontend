import {Province} from './province';
import Entity from "../../core/domain/entity";

export class City extends Entity {
    public name = '';
    public province: Province = null;

    constructor(value: Partial<City> = {}) {
      super();
      Object.assign(this, value);
      this.province = new Province(this.province);
    }

    public toString(): string {
            return this.name + ', ' + this.province.name;
    }

}
