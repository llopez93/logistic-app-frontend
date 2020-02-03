import Entity from "../../core/domain/entity";

export class Education extends Entity {

    public visibleTo: string = "0";
    public description: string = "";
    public activities: string = "";
    public endDate: number = Date.now();
    public startDate: number = Date.now();
    public academic: string = "";
    public title: string = "";
    public university: string = "";

    constructor(value: Partial<Education> = {}) {
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
