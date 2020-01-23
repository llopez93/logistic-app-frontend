import Entity from './entity';
import { FX } from './fx';
import { Role } from './role';

export default class User extends Entity {
    username = "";
    firstname = "";
    lastname = "";
    email = "";
    enabled = true;
    profilePhoto = '';
    fxs: FX[] = null;
    roles: Role[] = null;

    constructor(value: Partial<User> = {}) {
        super();
        Object.assign(this, value);
        if (this.fxs) { this.fxs = this.fxs.map(fx => new FX(fx)); }
        if (this.roles) { this.roles = this.roles.map(role => new Role(role)); }
    }

    public addFxs(fxs: FX[]) {
        this.fxs.concat(fxs.filter(fx => !this.fxs.some(f => f.equals(fx))));
    }

    public removeFxs(fxs: FX[]) {
        this.fxs = this.fxs.filter(fx => !fxs.some(f => f.equals(fx)));
    }

    public getFullName(): string {
        return this.firstname + " " + this.lastname;
    }

    public hasFx(fxname: string): boolean {
        return this.fxs.some(fx => fx.fxname === fxname);
    }
}