
import {Phone} from "../phone";
import Entity from "../../../core/domain/entity";
import {Ministry} from "./ministry";

export class MinistryArea extends Entity {
    public name: string = '';
    public ministry: Ministry = null;
    public phone: Phone = null;

    constructor(value: Partial<MinistryArea> = {}) {
      super();
        Object.assign(this, value);
        if (this.ministry) {
            this.ministry = new Ministry(this.ministry);
        }
        this.phone = new Phone(this.phone);
    }

    public getFullName(): string {
        if (this.ministry) {
            return this.ministry.name + ', ' + this.name;
        } else {
            return this.name;
        }
    }

    toString(): string {
        return this.name + ', ' + this.ministry.toString();
    }
}
