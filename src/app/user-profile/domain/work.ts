import Entity from "../../core/domain/entity";

export class Work extends Entity {

    public visibleTo: string = "0";
    public description: string = "";
    public company: string = "";
    public occupation: string = "";
    public endDate: number = Date.now();
    public startDate: number = Date.now();
    public workHere: Boolean = false;

    constructor(value: Partial<Work> = {}) {
      super();
      Object.assign(this, value);
    }

    public getStartDate(): Date {
        return new Date(this.startDate);
    }

    public getEndDate(): Date {
        return new Date(this.endDate);
    }


}
