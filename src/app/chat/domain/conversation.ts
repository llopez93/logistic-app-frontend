import Entity from "../../core/domain/entity";
import User from "../../core/domain/security/user";

export class Conversation extends Entity{
    participants: User[];
    createTime: number;
    groupConversation : boolean;
    lastMessageTime : number;
    unreadedMessages : number;


    constructor(value: Partial<Conversation> = {}) {
        super();
        Object.assign(this, value);
        if (this.participants)
            this.participants = this.participants.map(u => new User(u));
    }

    public getCreateTime() : Date {
        return new Date(this.createTime);
    }

}
