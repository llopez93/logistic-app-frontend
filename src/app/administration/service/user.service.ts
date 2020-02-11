import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import User from "../../core/domain/security/user";

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

}
