import Entity from "../../core/domain/entity";

export class Client extends Entity {

  name: string;
  phone: string;
  phoneType: string;
  email: string;

  constructor(o: Client | Partial<Client>) {
    super();
    Object.assign(this, o);
  }
}
