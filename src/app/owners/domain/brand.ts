import Entity from '../../core/domain/entity';

export default class Brand extends Entity {
  name = "";

  constructor(value: Partial<Brand> = {}) {
    super();
    Object.assign(this, value);
  }

  public compareTo(brand: Brand): boolean {
    return this.name.toLocaleLowerCase() === brand.name.toLocaleLowerCase();
  }

  public compareNameTo(brandName: string): boolean {
    return this.name.toLocaleLowerCase() === brandName.toLocaleLowerCase();
  }
}
