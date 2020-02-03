import {Injectable} from "@angular/core";
import {GenericService} from "../../core/service/generic.service";
import {NotificationTopic} from "../domain/notification-topic";

@Injectable({providedIn: 'root'})
export class NotificationTopicService extends GenericService<NotificationTopic> {


  protected valueToEntity(o: any): NotificationTopic {
    return new NotificationTopic(o);
  }

  protected getResourcePath(): string {
    return "/notificationTopic";
  }

}
