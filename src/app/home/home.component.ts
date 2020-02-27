import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/security/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-root',
  template: "",
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private readonly router: Router) {

  }


  ngOnInit(): void {
    this.authService.setUserIn();
    this.authService.user.subscribe(user => {
      if (user.firstLogin)
        this.router.navigate(['home', 'user-profile', 'settings']);
    });
  }

}
