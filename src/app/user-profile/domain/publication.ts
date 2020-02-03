import Entity from "../../core/domain/entity";

export class Publication extends Entity {

    public visibleTo: string = "0";
    public description: string = "";
    public publicationURL: string = "";
    public publicationDate: number = Date.now();
    public title: string = "";

    constructor(value: Partial<Publication> = {}) {
      super();
      Object.assign(this, value);

    }

}
