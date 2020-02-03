import Entity from "../../core/domain/entity";

export class Notification extends Entity {
  title: string;
  body: string;
  redirectTo: string;
  viewed: number;
  payload: string;
  icon: string;
  emittedTime: number;

  constructor(value: Partial<Notification> = {}) {
    super();
    Object.assign(this, value);
  }

  isFromConversation(conversationId: number): boolean {
    const matches = this.payload.match(/conversationId=\[[0-9]+]/);
    return matches.length > 0 && +matches[0].split('[').pop().split(']')[0] === conversationId;
  }

}
