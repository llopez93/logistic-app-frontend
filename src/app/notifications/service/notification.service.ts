import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Notification as NotificationEntity} from "../domain/notification";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends GenericService<NotificationEntity> {

  updateSubject = new BehaviorSubject(null);
  currentConversationId = new BehaviorSubject(null);
  notification: NotificationEntity = new NotificationEntity({});
  currentMessage = new BehaviorSubject(this.notification);

  // messaging: Messaging;

  constructor(protected http: HttpClient) {
    super(http);
    /*
    firebase.initializeApp(FirebaseConfig);
    this.messaging = firebase.messaging();

    this.currentConversationId.subscribe(id => {
      if(id != null){
        this.setViewedConversation(id).subscribe();
      }
    })
    */
  }

  protected getResourcePath(): string {
    return "/notification";
  }

  protected valueToEntity(o: any): NotificationEntity {
    return new NotificationEntity(o);
  }

  public currentMessageObservable(): Observable<NotificationEntity> {
    return this.currentMessage.asObservable();
  }

  getPermission() {
    /*
    Notification.requestPermission().then(() => {
      return this.messaging.getToken();
    })
      .then(token => {
        this.updateToken(token).subscribe();
      })
      .catch(err => {
        console.error("Unable to get permission to notify.", err);
      });
    */
  }

  receiveMessage(): void {
    /*
    this.messaging.onMessage(payload => {
      const notification = new NotificationEntity(payload.data);
      if (this.currentConversationId.getValue() != null &&
        notification.isFromConversation(this.currentConversationId.getValue())) {
        notification.viewed = 1;
        this.setViewed(notification.id).subscribe(() => {
          this.currentMessage.next(notification);
        });
      } else {
        this.currentMessage.next(notification);
      }

    });

     */
  }

  updateToken(token): Observable<any> {
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + "/updateToken",
      method: "POST",
      options: {body: {token}},
    });
  }

  setViewed(id: number): Observable<any> {
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + "/setViewed",
      method: "POST",
      options: {
        body: {id}
      }
    });
  }

  setViewedConversation(id: number): Observable<any> {
    this.updateSubject.next(1);
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + "/setViewedConversation",
      method: "POST",
      options: {body: {id}}
    });
  }
}
