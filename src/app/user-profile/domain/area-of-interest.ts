import Entity from "../../core/domain/entity";


export class AreaOfInterest extends Entity {
    public name: string = "";

    constructor(value: Partial<AreaOfInterest> = {}) {
      super();
      Object.assign(this, value);
    }

    public equals( area : AreaOfInterest ) : boolean{
        if (area){
            return area.name == this.name;
        }
        return false
    }

}

export const areas = [
    new AreaOfInterest({id:1,name:"Salud"}),
    new AreaOfInterest({id:2,name:"Medio ambiente"}),
    new AreaOfInterest({id:3,name:"Derecho laboral"}),
    new AreaOfInterest({id:4,name:"Derecho procesal"}),
    new AreaOfInterest({id:5,name:"Criminología"}),
    new AreaOfInterest({id:6,name:"Obras públicas"})
];
