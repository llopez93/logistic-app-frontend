import Entity from "../core/domain/entity";
import {Client} from '../client/domain/client';
import Truck from "../owners/domain/truck";
import {Provider} from "./provider";
import {Material} from "./material";
import User from "../core/domain/security/user";

export class Trip extends Entity {

  client: Client;
  truck: Truck;
  tripDate: Date | number;
  origin: Provider = null;
  originName: string = null;
  destination: string;
  material: Material;
  loadSize: number;
  loadCost: boolean;
  fuel = 0;
  materialPrice = 0;
  price = 0;
  createdBy: User = null;

  constructor(o: Trip | Partial<Trip>) {
    super();
    Object.assign(this, o);
    if (this.client)
      this.client = new Client(this.client);
    if (this.truck)
      this.truck = new Truck(this.truck);
    if (this.material)
      this.material = new Material(this.material);
    if (this.origin)
      this.origin = new Provider(this.origin);
    if (this.createdBy)
      this.createdBy = new User(this.createdBy);
  }

}
