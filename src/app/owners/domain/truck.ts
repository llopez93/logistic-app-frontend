import Entity from "../../core/domain/entity";
import Model from "./model";
import Owner from "./owner";

export default class Truck extends Entity {
  name: string;
  domain: string;
  year: number;
  model: Model = new Model();
  owner: Owner = new Owner();

  constructor(value: Partial<Truck> = {}) {
    super();
    Object.assign(this, value);
    if (this.model) this.model = new Model(this.model);
    if (this.owner) this.owner = new Owner(this.owner);
  }

  public hasModel(modelName: string): boolean {
    return this.model.compareNameTo(modelName);
  }
}
