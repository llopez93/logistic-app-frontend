import { Injectable } from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Message} from "../domain/message";
import {Conversation} from "../domain/conversation";
import {Observable} from "rxjs";

@Injectable()
export class MessageService extends GenericService<Message> {

  protected valueToEntity(value: Object): Message {
    return new Message(value);
  }

  protected getResourcePath(): string {
    return "/chat/message";
  }

  public getMessagesByConversation(c: Conversation, pageSize: number, page: number): Observable<Message[]> {
    return this.doRequest({
      method: 'GET',
      url: this.baseUrl + this.getResourcePath() + "/" + c.id + "/" + pageSize + "/" + page,
      map: (o) => this.mapToPaginationPage(o).content
    });
  }

  public changeMessageState(msgId: number, state: boolean): Observable<any> {
    return this.doRequest({
      method: "GET",
      url: this.baseUrl + this.getResourcePath() + "/update",
      options: {
        body: { messageId: msgId, state: state }
      }
    })
  }
}
