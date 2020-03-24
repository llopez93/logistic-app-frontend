import Entity from '../../core/domain/entity';
import Truck from './truck';

export default class Owner extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  cuil: string;
  shovelCost: number = 0;
  trucks: Truck[] = [];

  constructor(value: Partial<Owner> = {}) {
    super();
    Object.assign(this, value);
  }
}

