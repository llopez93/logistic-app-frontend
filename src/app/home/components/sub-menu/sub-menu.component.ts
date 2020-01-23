import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import MenuItem from "../../domain/menu-item";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../../core/security/service/auth.service";
import User from "../../../core/domain/user";
import {FX} from "../../../core/domain/fx";

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent implements OnInit{

  @Input() items: MenuItem[];

  @Input() root = false;

  user: User;

  constructor(public router: Router, private authService: AuthService) {
    this.user = authService.userValue;
  }

  ngOnInit(): void {
    console.table(this.items);
  }

  shouldShow(item: MenuItem): boolean {
    //return true;
    return item.canBeShownUser(this.user);
  }

  onClick(item: MenuItem){
    this.router.navigate(["home", item.route]);
  }



}
