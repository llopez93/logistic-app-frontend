import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'
import {AuthService} from "../../../core/security/service/auth.service";
import {isNumber} from "util";
import MenuItem, {menuItems} from "../../domain/menu-item";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor() {
    this.items = menuItems;
  }
;
  ngOnInit() {

  }




}
