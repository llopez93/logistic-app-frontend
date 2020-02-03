import Entity from "../../core/domain/entity";

export class Course extends Entity {
    public name = '';
    public visibleTo = '0';
    public description = '';

    constructor(value: Partial<Course> = {}) {
      super();
      Object.assign(this, value);
    }

}
