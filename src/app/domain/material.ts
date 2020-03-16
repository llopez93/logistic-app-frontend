import Entity from "../core/domain/entity";


export class Material extends Entity {

  name: string;
  unit: string;

  constructor(o: Material | Partial<Material>) {
    super();
    Object.assign(this, o);
  }


  compareTo(o: Material): boolean{
    return this.name === o.name;
  }

}
