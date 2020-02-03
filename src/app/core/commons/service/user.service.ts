import {Injectable} from '@angular/core';
import {GenericService} from "../../service/generic.service";
import User from "../../domain/security/user";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService extends GenericService<User> {

  private userUrl = '/users';

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
      url: this.baseUrl + this.userUrl + '/change_password',
      method: 'POST',
      options: {
        body: {oldPassword, newPassword}
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


  //TODO Migrar estos dos
 /* public pagedSearch(terms: string, enabled: string,
                     queryOptions: QueryOptions = this.getDefaultQueryOptions()): Observable<PaginationPage<User>> {
    const ro = queryOptions.getQueryRequestOptions().merge({
      url: this.baseUrl + this.getResourcePath() + '/search'});
    if (terms) {
      ro.params.append('terms', terms)
    }

    ro.params.append('enabled', enabled);
    return this.doRequest(ro)
      .map(res => res.json())
      .concatMap(json => Observable.from(json.content)
        .concatMap(value => this.mapValueToEntityQuery(value))
        .toArray()
        .map(content => new PaginationPage({...json, content: content}))
      );
  }

  public findByRole(role: Role): Observable<User[]> {
    const req = this.buildRequest(RequestMethod.Get);
    return this.authService.authRequest(this.baseUrl + this.userUrl + '/by_rol/' + role.id , req)
      .map(res => res.json().map( t => this.valueToEntity(t) ) );
  }
*/


}
