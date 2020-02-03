import {Component, OnInit} from '@angular/core';
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

  ngOnInit() {

  }


}
