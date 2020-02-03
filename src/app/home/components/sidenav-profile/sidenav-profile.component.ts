import { Component, OnInit } from '@angular/core';
import User from "../../../core/domain/security/user";
import {AuthService} from "../../../core/security/service/auth.service";

@Component({
  selector: 'app-sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.scss']
})
export class SidenavProfileComponent implements OnInit {

  expanded: boolean;
  user: User;
  userFullName: string;
  profilePhoto = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(u => {
      this.user = u;
      this.userFullName = u.getFullName();
    });
  }

  logout(): void {
    this.authService.logout();
  }



}
