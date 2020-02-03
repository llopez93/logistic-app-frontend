import Entity from "../../core/domain/entity";

export class NotificationTopic extends Entity{
  id: number;
  name: string;
  displayName: string;

  constructor(value: Partial<NotificationTopic> = {}) {
    super();
    Object.assign(this, value);
  }
}
