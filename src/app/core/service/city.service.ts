import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {City} from "../domain/address/city";


@Injectable()
export class CityService extends GenericService<City> {

  private cityUrl = 'address/cities';

  constructor(protected http: HttpClient) {
    super(http);
  }

  protected valueToEntity(value: any): City {
    return new City(value);
  }

  protected getResourcePath(): string {
    return this.cityUrl;
  }

  public getCitiesByProvinceId(id: number): Observable<City[]> {
    return this.doRequest({
      url: this.baseUrl + this.getResourcePath() + '/by-province/' + id,
      method: "GET",
      map: this.mapToEntityArray
    });
  }


}
