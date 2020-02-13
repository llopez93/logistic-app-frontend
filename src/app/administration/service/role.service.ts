import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import User from "../../core/domain/security/user";
import {Role} from "../../core/domain/security/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends GenericService<Role> {

  protected getResourcePath(): string {
    return "roles";
  }

  protected valueToEntity(o: any): Role {
    return new Role(o);
  }

}
