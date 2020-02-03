import Entity from "../../core/domain/entity";

export class Project extends Entity {

    public name: string = "";
    public visibleTo: string = "0";
    public description: string = "";
    public occupation: string = "";
    public projectURL: string = "";
    public endDate: number = Date.now();
    public startDate: number = Date.now();
    public workNow: Boolean = false;

    constructor(value: Partial<Project> = {}) {
        super()
        Object.assign(this, value);
    }

    public getEndDate(): Date{
        return new Date(this.endDate);
    }

    public getStartDate(): Date{
        return new Date(this.startDate);
    }


}
