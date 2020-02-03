import Entity from "../../core/domain/entity";

export class Certification extends Entity {

    public name: string = "";
    public visibleTo: string = "0";
    public certificationAuthority: string = "";
    public certificationURL: string = "";
    public endDate: number = Date.now();
    public startDate: number = Date.now();

    constructor(value: Partial<Certification> = {}) {
      super();
      Object.assign(this, value);

    }

    public getEndDate(): Date{
        return new Date(this.endDate);
    }

    public getStartDate(): Date{
        return new Date(this.startDate);
    }


}
