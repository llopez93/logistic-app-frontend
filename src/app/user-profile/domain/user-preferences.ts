import {NotificationTopic} from "../../notifications/domain/notification-topic";

export class UserPreferences {
  id: number;
  sendUnreadedNotificationsByEmail: boolean;
  suscribedTopics: NotificationTopic[];
  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
