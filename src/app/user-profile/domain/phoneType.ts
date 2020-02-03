import Entity from "../../core/domain/entity";

export class PhoneType extends Entity {
    public phoneType: string = "";

    constructor(value: Partial<PhoneType> = {}) {
      super();
      Object.assign(this, value);
    }

}
