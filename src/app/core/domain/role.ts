import Entity from './entity';
import { FX } from './fx';

export class Role extends Entity {
    name = "";
    fxs: FX[] = [];

    constructor(value: Partial<Role> = {}) {
        super();
        Object.assign(this, value);
        if (this.fxs) {
            this.fxs = this.fxs.map(fx => new FX(fx));
        }
    }

    public hasFX(fx: FX): boolean {
        return this.fxs.some(f => f.equals(fx));
    }

    public addFX(fx: FX) {
        if (!this.hasFX(fx)) {
            this.fxs.push(fx);
        }
    }

    public removeFX(fx: FX) {
        this.fxs = this.fxs.filter(f => !f.equals(fx));
    }
}
