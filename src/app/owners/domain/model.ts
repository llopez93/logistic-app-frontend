import Entity from '../../core/domain/entity';
import Brand from './brand';

export default class Model extends Entity {
  name = "";
  brand: Brand = new Brand();

  constructor(value: Partial<Model> = {}) {
    super();
    Object.assign(this, value);
    if (this.brand)
      this.brand = new Brand(this.brand);
  }

  public compareTo(model: Model): boolean {
    return this.name.toLocaleLowerCase() === model.name.toLocaleLowerCase();
  }

  public compareNameTo(modelName: string): boolean {
    return this.name.toLocaleLowerCase() === modelName.toLocaleLowerCase();
  }

  public hasBrand(brandName: string): boolean {
    return this.brand.compareNameTo(brandName);
  }
}
