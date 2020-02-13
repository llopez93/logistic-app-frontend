import {Component, Input, OnInit} from '@angular/core';
import MenuItem from "../../domain/menu-item";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/security/service/auth.service";
import User from "../../../core/domain/security/user";

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent implements OnInit {

  @Input() items: MenuItem[];

  @Input() root = false;

  user: User;

  constructor(public router: Router, private authService: AuthService) {
    authService.user.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  shouldShow(item: MenuItem): boolean {
    if (this.user)
      return item.canBeShownUser(this.user);
    return false;
  }

  onClick(item: MenuItem) {
    if (item.route) {
      let urlSegments: string[] = item.route.split('/');
      urlSegments.unshift("home");
      this.router.navigate(urlSegments);
    }
  }

  isActive(item: MenuItem): boolean {
    if (item.route == null) return false;
    return this.router.isActive(item.route, false);
  }

  hasChildActive(item: MenuItem): boolean {
    return item.children.some(item => this.isActive(item));
  }


}
