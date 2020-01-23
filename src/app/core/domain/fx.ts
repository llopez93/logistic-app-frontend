import Entity from './entity';

export class FX extends Entity {

    name = "";
    type = "";
    target = "";
    fxname = "";

    constructor(value: Partial<FX> = {}) {
        super();
        Object.assign(this, value);
    }

}
