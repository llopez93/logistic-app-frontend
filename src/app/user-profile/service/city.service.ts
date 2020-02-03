import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {City} from "../domain/city";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: "root"})
export class CityService extends GenericService<City> {

    private cityUrl = '/cities';

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
            url: this.baseUrl + this.getResourcePath() + '/province/' + id,
            method: "GET", map: this.mapToEntityArray
        })
    }


}
