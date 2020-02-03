import Entity from "../../core/domain/entity";
import {Conversation} from "./conversation";
import User from "../../core/domain/security/user";
import {AttachedFile} from "./attached-file";

export class Message extends Entity {
  id: number;
  user: User;
  createTime: number;
  content: string;
  conversation: Conversation;
  readed: boolean;
  attachedFile: AttachedFile;

  constructor(value: Partial<Message> = {}) {
    super();
    Object.assign(this, value);
    if (this.user)
      this.user = new User(this.user);
    if (this.conversation)
      this.conversation = new Conversation(this.conversation);
    if(this.attachedFile)
      this.attachedFile = new AttachedFile(this.attachedFile);
  }

  public getCreateTime() : Date {
    return new Date(this.createTime);
  }
}
