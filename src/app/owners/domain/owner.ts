import Entity from '../../core/domain/entity';

export default class Owner extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  cuil: string;
  shovelCost: number = 0;
  tripCost: number = 0;

  constructor(value: Partial<Owner> = {}) {
    super();
    Object.assign(this, value);
  }
}

