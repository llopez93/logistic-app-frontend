import Entity from "../../core/domain/entity";

export class Language extends Entity {
    public name: string = "";
    public visibleTo: string = "0";
    public level: string = "";

    constructor(value: Partial<Language> = {}) {
      super();
      Object.assign(this, value);
    }

}
