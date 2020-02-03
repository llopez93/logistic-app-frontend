import {Injectable} from '@angular/core';
import {Ministry} from "../domain/ministry/ministry";
import {environment} from "../../../environments/environment";
import User from "../../core/domain/security/user";
import {GenericService} from "../../core/service/generic.service";
import {PaginationPage} from "../../core/domain/requests/pagination-page";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class MinistryService extends GenericService<Ministry> {

    constructor(protected http: HttpClient) {
      super(http);
    }

    protected valueToEntity(value: any): Ministry {
        return new Ministry(value);
    }

    protected getResourcePath(): string {
        return '/ministries';
    }

    public publicFindAll(): Observable<Ministry[]> {
        return this.doRequest({
          url: environment.backendHost + environment.backendPublicApiPath + "/ministry/all",
          method: "GET",
          map: this.mapToEntityArray
        });

    }

    //TODO hacer esto
  /*
    public pagedSearch(terms: string, queryOptions: QueryOptions = this.getDefaultQueryOptions()): Observable<PaginationPage<Ministry>> {
        const ro = queryOptions.getQueryRequestOptions().merge({
            url: this.baseUrl + this.getResourcePath() + '/search'});
        if (terms) {
            ro.params.append('terms', terms)
        }

        return this.doRequest(ro)
            .map(res => res.json())
            .concatMap(json => Observable.from(json.content)
                .concatMap(value => this.mapValueToEntityQuery(value))
                .toArray()
                .map(content => new PaginationPage({...json, content: content}))
            );

    }
*/
}
