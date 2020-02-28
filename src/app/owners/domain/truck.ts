import Entity from '../../core/domain/entity';
import Model from './model';

export default class Truck extends Entity {
  name = "";
  domain = "";
  year = 0;
  model: Model = new Model();

  constructor(value: Partial<Truck> = {}) {
    super();
    Object.assign(this, value);
    if (this.model)
      this.model = new Model(this.model);
  }

  public hasModel(modelName: string): boolean {
    return this.model.compareNameTo(modelName);
  }
}
