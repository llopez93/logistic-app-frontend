import {City} from "./city";
import Entity from "../../core/domain/entity";
/**
 * Created by Federico on 25/03/2017.
 */
export class Address extends Entity {
    public street: string = '';
    public city: City = null;

    constructor(value: Partial<Address> = {}) {
      super();
      Object.assign(this, value);
      this.city = new City(this.city);
    }

    toString(): string {
        return this.street + ', ' + this.city.name;
    }

}
