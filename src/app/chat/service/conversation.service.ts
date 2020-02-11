import { Injectable } from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Conversation} from "../domain/conversation";
import User from "../../core/domain/security/user";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {NotificationService} from "../../notifications/service/notification.service";
import {Message} from "../domain/message";
import {StompService} from "@stomp/ng2-stompjs";
import {PaginationPage} from "../../core/domain/requests/pagination-page";
import {IMessage} from "@stomp/stompjs";
import {map} from "rxjs/operators";

@Injectable()
export class ConversationService extends GenericService<Conversation>{

  public  user: User;
  private conversationList: Conversation[] = [];
  private conversationListSubject: Subject<Conversation[]> = new Subject();
  private ws: Observable<IMessage>;
  private conversationSelected: Conversation = null;

  constructor(public messageService: MessageService,
              private notificationService: NotificationService,
              private stompService: StompService,
              protected http: HttpClient) {
    super(http);
  }

  protected valueToEntity(value: Object): Conversation {
    return new Conversation(value);
  }

  protected getResourcePath(): string {
    return '/chat';
  }


  protected downloadPathPdf(): string {
    return '/message'
  }

  /**
   * Devuelve un observable de la lista de conversaciones del usuario.
   * @returns Observable<Conversation[]>
   */
  public subscribeConversationList(): Observable<Conversation[]> {
    return this.conversationListSubject.asObservable();
  }

  /**
   * Envia una lista de conversaciones del usuario por el observable conversationListSubject
   */
  public getConversationList(): void {
    this.conversationListSubject.next(this.conversationList);
  }

  public setUserAndConversations(u: User): void {
    this.user = u;
    this.findConversationsByUser(this.user.id, 1000, 0)
      .subscribe(c => {
        this.conversationList = c.content;
        this.conversationList.forEach(c => {
          c.participants = c.participants.filter(u => u.id != this.user.id)
        });

        this.ws = this.stompService.subscribe('/conversations/' + this.user.id);
        this.ws.pipe(map(c => new Conversation(JSON.parse(c.body))))
          .subscribe(c => {
            (<Conversation> c).participants = (<Conversation> c).participants.filter(u => u.id != this.user.id);
            this.refreshConversationList(c);
          });

        this.getConversationList();
      }); //TODO: no traer todas las conversaciones, ir paginando;
  }

  public addConversation(c: Conversation): void {
    this.conversationList.unshift(c);
    this.getConversationList();
  }

  public refreshConversationList(c: Conversation, msgTime: number = null): void {
    if (this.conversationSelected && ( this.conversationSelected.id == c.id )) {
      this.conversationList = this.conversationList.filter(conversation => c.id != conversation.id);
    } else {
      this.conversationList.forEach( ( conversation, index, array ) => {
        if ( conversation.id == c.id ) {
          c.unreadedMessages = conversation.unreadedMessages + 1;
          array.splice(index, 1);
        }
      });
    }

    if (msgTime)
      c.lastMessageTime = msgTime;
    this.addConversation(c);
  }

  public updateViewedNotifications() {
    this.notificationService.setViewedConversation(this.conversationSelected.id);
  }

  public sendMessage(m: Message): Observable<Message> {
    return this.messageService.create(m);
  }

  public getMessagesPage(c: Conversation, page: number): Observable<Message[]> {
    return this.messageService.getMessagesByConversation(c, 25, page);
  }


  public getLatestMessages(c: Conversation): Observable<Message[]> {
    return this.messageService.getMessagesByConversation(c, 25, 0);
  }


  public findConversationsByUser(userId: number, pagesize: number, page: number): Observable<PaginationPage<Conversation>> {
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + '/' + userId + '/' + pagesize + '/' + page,
      method: 'GET',
      map: this.mapToPaginationPage
    });
  }

  public filterConversations(searchTerm: string): Conversation[] {
    if (searchTerm == '')
      return this.conversationList;
    return this.conversationList.filter(c =>
      c.participants.filter(p =>
        p.firstName.toLowerCase().concat(' ').concat(p.lastName.toLowerCase()).includes(searchTerm.toLowerCase())
      ).length > 0)
  }

  public setSelectedConversation(c: Conversation): void {
    this.conversationSelected = c;
    this.notificationService.currentConversationId.next(c.id);
    this.clearUnreadedMessages(this.conversationSelected);
  }

  public unsetSelectedConversation(): void {
    this.conversationSelected = null;
    this.notificationService.currentConversationId.next(null);
  }

  public clearUnreadedMessages(c: Conversation): void {
    this.conversationList.forEach(conversation => {
      if (conversation.id == c.id)
        conversation.unreadedMessages = 0
    })
  }

  public downloadPDF(messageId: number): Observable<Blob> {
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + '/message/' + messageId,
      method: "GET",
      options: {
        responseType: 'blob'
      },
      map: res => new Blob([res], {type: 'application/pdf'})
    })
  }

  public downloadImage(messageId: number): Observable<Blob> {
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + '/message/image/' + messageId,
      method: "GET",
      options: {
        responseType: 'blob'
      },
      map: res => new Blob([res], {type: 'image/jpg'})
    });

  }



}
