import Entity from "../../core/domain/entity";
import {Address} from "../../core/domain/address/address";

export class Client extends Entity {

  name: string;
  socialReason: string;
  cuil: string;
  phone: string;
  phoneType: string;
  email: string;
  address: Address;

  constructor(o: Client | Partial<Client>) {
    super();
    Object.assign(this, o);
    if (this.address)
      this.address = new Address(this.address);
  }
}
