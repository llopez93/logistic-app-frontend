import {GenericService} from "../../core/service/generic.service";
import {Profile} from "../domain/profile";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {UserPreferences} from "../domain/user-preferences";
import {tap} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class ProfileService extends GenericService<Profile> {

  private profileUrl = "/profiles";
  private cache: Map<number, Profile> = new Map<number, Profile>();

  protected valueToEntity(value: any): Profile {
    return new Profile(value);
  }

  protected getResourcePath(): string {
    return this.profileUrl;
  }

  getByUserId(id :number): Observable<Profile>{
    return this.doRequest({
      url: this.baseUrl + this.profileUrl + "/user/" + id,
      method: 'GET',
      map: this.valueToEntity
    })
  }

  getProfilePhotoByUserId(id: number): Observable<Profile> {
    if(this.cache.has(id)){
      return of(this.cache.get(id));
    }
    return this.doRequest({
      url: this.baseUrl + this.profileUrl + '/user/' + id + '/photo',
      method: 'GET',
      map: this.valueToEntity,
      errorHandler: () => {
        this.cache.set(id, new Profile());
        return of(null)
      }
    }).pipe(tap((p => {
      this.cache.set(id, p);
    })));

  }

  getUserPreferences(): Observable<UserPreferences> {
    return this.doRequest({url: this.baseUrl + "/userPreferences", method: "GET", map: o => new UserPreferences(o)})
  }

  updateUserPreferences(userPreferences: UserPreferences): Observable<UserPreferences> {
    return this.doRequest({url: this.baseUrl + "/userPreferences", method: "PUT",
      options: {body: userPreferences}, map: o => new UserPreferences(o)})
  }


}
