import {Address} from "../core/domain/address/address";
import {Material} from "./material";
import Entity from "../core/domain/entity";


export class Provider extends Entity {

  name: string;
  socialReason: string;
  cuil: string;
  phone: string;
  phoneType: string;
  email: string;
  address: Address;
  materials: Material[];

  constructor(o: Provider | Partial<Provider>) {
    super();
    Object.assign(this, o);
    if (this.address)
      this.address = new Address(this.address);
    if (this.materials)
      this.materials = this.materials.map(m => new Material(m));
  }
}
