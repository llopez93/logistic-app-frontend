import {Address} from "./address";
import {Phone} from "./phone";
import {AreaOfInterest} from "./area-of-interest";
import {Ministry} from "./ministry/ministry";
import Entity from "../../core/domain/entity";


export class Profile extends Entity {

    public firstname: string = "";
    public lastname: string = "";
    public birthDate: number = Date.now();
    public dni: number = null;
    public phones: Array<Phone> = [];
    public areaOfInterest : AreaOfInterest = null;
    public ministry : Ministry = null;
    public address: Address = null;
    public workPhone: Phone = new Phone();
    public profilePhoto: string = "";
    public backgroundPhoto: string = "";


    constructor(value: Partial<Profile> = {}) {
      super();
      Object.assign(this, value);
      this.address = this.address ? new Address(this.address) : new Address();
      this.ministry = this.ministry ? new Ministry(this.ministry): null;
      this.areaOfInterest = this.areaOfInterest ? new AreaOfInterest(this.areaOfInterest): null;
      this.phones = this.phones ? this.phones.map(phone => new Phone(phone)) : [];
      if(this.workPhone) this.workPhone = new Phone(this.workPhone);

    }

}

