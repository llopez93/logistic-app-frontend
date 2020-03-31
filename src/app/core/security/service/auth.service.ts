import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import User from '../../domain/security/user';
import {filter, map, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FX} from "../../domain/security/fx";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.backendHost;
  authUrl = '/auth';
  jwtHelper: JwtHelperService = new JwtHelperService( );
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {

  }

  get user(): Observable<User> {
    return this._user.asObservable().pipe(filter(user => user != null));
  }

  get userValue(): User {
    return this._user.getValue();
  }

  login(username: string, password: string): Observable<any> {
      const body = JSON.stringify({
          username,
          password
      });

      return this.http.post(this.baseUrl + this.authUrl, body)
          .pipe(tap(res => {
              localStorage.setItem(environment.tokenName, res.token);
              this.setUserIn();
          }));
  }

  logout() {
      this._user.next(null);
      localStorage.removeItem(environment.tokenName);
      return this.router.navigate(['login']);
  }

  setUserIn() {
    if (this._user.getValue() == null && this.getToken() != null) {
        this.http.get(environment.backendHost + '/users/logged')
          .subscribe((u: User) => this._user.next(new User(u)));
    }
  }

  getToken(): string {
    return localStorage.getItem(environment.tokenName);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(environment.tokenName);
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

}

