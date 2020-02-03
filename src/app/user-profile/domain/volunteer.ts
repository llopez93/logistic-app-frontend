import Entity from "../../core/domain/entity";

export class Volunteer extends Entity {

    public visibleTo: string = "0";
    public description: string = "";
    public organization: string = "";
    public role: string = "";
    public cause: string = "";
    public endDate: number = Date.now();
    public startDate: number = Date.now();
    public volunteerNow: Boolean = false;

    constructor(value: Partial<Volunteer> = {}) {
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
