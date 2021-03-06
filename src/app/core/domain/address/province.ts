import Entity from "../entity";

export class Province extends Entity {

  public name: string = "";

  constructor(value: Partial<Province> = {}) {
    super();
    Object.assign(this, value);
  }

  equals(province: Province): boolean {
    if (province) {
      return (this.id == province.id) && (this.name == province.name);
    }
    return false;
  }

  public toString(): string {
    return name;
  }

  compareTo(p: Province): boolean {
    return p && this.name === p.name;
  }

}
