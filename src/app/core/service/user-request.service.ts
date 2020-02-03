import {Injectable} from '@angular/core';
import {GenericService} from "./generic.service";
import {UserRequest} from "../domain/user-request";
import {AuthService} from "../security/service/auth.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class UserRequestService  extends GenericService<UserRequest>{

  constructor( authService: AuthService, protected http: HttpClient ) {
    super(http);
  }

  //
  // getPage(index: number, size: number, name: string, email: string): Observable<PaginationPage<UserRequest>> {
  //   return this.doRequest({
  //     url: this.baseUrl + this.getResourcePath() + '?page=' + index + '&size=' + size
  //       + '&name=' + name + '&email=' + email ,
  //     method: RequestMethod.Get
  //   }) .map(res => res.json())
  //     .concatMap(json => Observable.from(json.content)
  //       .concatMap(value => this.mapValueToEntityGetAll(value))
  //       .toArray()
  //       .map(content => new PaginationPage({...json, content: content}))
  //     ) as Observable<PaginationPage<UserRequest>>;
  // }

  protected valueToEntity(value: Object): UserRequest {
    return new UserRequest(value);
  }

  public getResourcePath(): string {
    return '/user-register'
  }

  /*
  public create(t: UserRequest): Observable<UserRequest> {
    let req = {
      url: environment.backendHost + environment.backendPublicApiPath + this.getResourcePath(),
      method: RequestMethod.Post,
      body: JSON.stringify(t)
    };
    let options = new BaseRequestOptions();
    options = options.merge(req);
    options.headers.append('Content-Type', 'application/json');

    return this.authService.publicRequest( options.url, options)
      .map(res => this.valueToEntity(res.json()));
  }

  public rejectRequest(t: UserRequest) {
    let req = this.buildRequest( RequestMethod.Post, JSON.stringify(t.id) );
    return this.authService.authRequest( this.baseUrl + this.getResourcePath()+"/reject", req);
  }

  public approveRequest(t: UserRequest) {
    let req = this.buildRequest( RequestMethod.Post, JSON.stringify(t) );
    return this.authService.authRequest( this.baseUrl + this.getResourcePath()+"/approve", req);
  }

  public checkEmail(mail: string) : Observable<boolean>{
    let req = this.buildRequest(RequestMethod.Post, mail);

    return this.authService.publicRequest( environment.backendHost + environment.backendPublicApiPath + this.getResourcePath() +"/check-mail", req)
      .switchMap(res => {
        let users = res.json();
        if (users.length>0)
          return Observable.throw("El correo electrónico ya existe en el sistema");
        else
          return Observable.of(true);
      });
  }

  public checkDni(dni: string) : Observable<boolean>{
    let req = this.buildRequest(RequestMethod.Post, dni);

    return this.authService.publicRequest( environment.backendHost + environment.backendPublicApiPath + this.getResourcePath() +"/check-dni", req)
      .switchMap(res => {
        let profiles = res.json();
        console.log(profiles);
        if (profiles.length>0)
          return Observable.throw("Ya existe un usuario que posee el mismo dni en el sistema");
        else
          return Observable.of(true);
      });
  }

  */

}
