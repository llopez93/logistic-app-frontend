import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {NotificationService} from "../../../notifications/service/notification.service";
import {AuthService} from "../../../core/security/service/auth.service";
import {Notification} from "../../../notifications/domain/notification";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  opened: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      tap(isMobile => this.opened = !isMobile)
    );

  newNotifications = 0;
  items: Notification[] = [];

  constructor(private breakpointObserver: BreakpointObserver,
              private notificationService: NotificationService,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    /*
    this.initFCM();
    this.initNotificationPanel();
    */

  }

  public logout() {
    this.authService.logout();
  }

  private initFCM(): void {
    this.notificationService.getPermission();
    this.notificationService.receiveMessage();
    this.notificationService.currentMessageObservable().subscribe(
      x => {
        if (x.id != null && x.title != null && x.body != null) {
          this.items.unshift(x);
          this.refreshNewNotifications();
        }
      },
      err => console.error("Observer got an error: " + err)
    );

    this.notificationService.currentConversationId.subscribe(() => {
      setTimeout(() => this.initNotificationPanel(), 1000);
    });

    this.notificationService.updateSubject.subscribe(() => setTimeout(() => this.initNotificationPanel(), 1000));

    navigator.serviceWorker.addEventListener("message", event => {
      if (this.notificationService.currentConversationId.getValue() != null) {
        setTimeout(() => this.initNotificationPanel(), 500);
      } else {
        this.initNotificationPanel();
      }
    });
  }

  initNotificationPanel(): void {
    this.notificationService.getPage({page: 0, size: 0})
      .subscribe(items => {
        this.items = items.content;
        this.refreshNewNotifications();
      });
  }

  refreshNewNotifications(): void {
    let n = 0;
    let is: number;
    this.items.map(function(item) {
      is = Number(item.viewed);
      if (is === 0) {
        n++;
      }
    });
    this.newNotifications = n;
  }

  showNotificationIcon(): boolean {
    return this.newNotifications > 0;
  }

  getColor(is: number) {
    let i: number = Number(is);
    if (i === 0) {
      return "#E5E5E5";
    }
  }

  getDate(e: number): string {
    let date = new Date(e);
    return date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      "  " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      " hs.";
  }

  navigate(item: Notification) {
    this.setViewed(item.id);
    this.notificationService.setViewed(item.id).subscribe();
    this.router.navigate(item.redirectTo.split("/"));
  }

  private setViewed(id: number): void {
    let i: number = 0;
    let e: boolean = false;
    while (i < this.items.length && !e) {
      if (this.items[i].id == id) {
        this.items[i].viewed = 1;
        e = true;
      }
      i++;
    }
    this.refreshNewNotifications();
  }

}
