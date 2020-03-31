import Entity from "../core/domain/entity";
import {Material} from "./material";


export class MaterialPrice extends Entity {

  price: number;
  material: Material;

  constructor(o: MaterialPrice | Partial<MaterialPrice>) {
    super();
    Object.assign(this, o);
    if (this.material)
      this.material = new Material(this.material);

  }

  compareTo(o: MaterialPrice): boolean {
    return this.material.name === o.material.name;
  }

}
