import {PhoneType} from "./phoneType";
import Entity from "../../core/domain/entity";

export class Phone extends Entity {
    public phone: string = "";
    public phoneType: PhoneType = null;

    constructor(value: Partial<Phone> = {}) {
        super();
        Object.assign(this, value);
        this.phoneType = new PhoneType(this.phoneType);
    }

}
