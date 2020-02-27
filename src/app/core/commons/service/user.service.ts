import {Injectable} from '@angular/core';
import {GenericService} from "../../service/generic.service";
import User from "../../domain/security/user";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService extends GenericService<User> {

  private userUrl = 'users';

  protected valueToEntity(value: Object): User {
    return new User(value);
  }

  protected getResourcePath(): string {
    return this.userUrl;
  }

  public resetPass(user: User): Observable<User> {
    return this.doRequest({
      url: this.baseUrl + this.userUrl + '/' + user.id + '/reset_password',
      method: 'POST',
      map: this.valueToEntity
    });

  }

  public changePass(oldPassword: string, newPassword: string): Observable<User> {
    return this.doRequest({
      url: this.baseUrl + this.userUrl + '/change-password',
      method: 'POST',
      options: {
        body: {actualPassword: oldPassword, newPassword: newPassword}
      },
      map: this.valueToEntity
    });
  }

  public findByValue(value: string): Observable<User[]> {
    return this.doRequest({
      url: this.baseUrl + this.userUrl + '/find',
      method: 'GET',
      options: {
        params: {value}
      },
      map: this.mapToEntityArray
    });
  }

}
