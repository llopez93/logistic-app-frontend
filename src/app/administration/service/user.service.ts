import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import User from "../../core/domain/security/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  protected getResourcePath(): string {
    return "users";
  }

  protected valueToEntity(o: any): User {
    return new User(o);
  }

  public resetPassword(user: User): Observable<any> {
    return this.doRequest({
      method: "PUT",
      url: this.baseUrl + this.getResourcePath() + "/reset",
      options: {
        body: user
      }
    });
  }

}
