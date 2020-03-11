import Entity from '../../core/domain/entity';

export default class Owner extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  cuil: string;

  constructor(value: Partial<Owner> = {}) {
    super();
    Object.assign(this, value);
  }
}
