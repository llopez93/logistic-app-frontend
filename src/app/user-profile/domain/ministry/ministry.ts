import { Address } from "../address";
import Entity from "../../../core/domain/entity";

export class Ministry extends Entity {
  public name: string = "";
  public address: Address;

  constructor(value: Partial<Ministry> = {}) {
    super();
    Object.assign(this, value);
    this.address = new Address(this.address);
  }

  toString(): string {
    return name;
  }

}
