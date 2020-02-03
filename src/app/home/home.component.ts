import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/security/service/auth.service";

@Component({
  selector: 'app-home-root',
  template: "",
})
export class HomeComponent implements OnInit{

  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    //this.authService.login("llopez", "UNRN.fiscalia2018").subscribe();
    this.authService.setUserIn();
  }

}
