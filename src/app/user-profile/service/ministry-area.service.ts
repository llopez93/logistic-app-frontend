import {Injectable} from '@angular/core';
import {MinistryArea} from "../domain/ministry/ministry-area";
import {environment} from "../../../environments/environment";
import {GenericService} from "../../core/service/generic.service";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class MinistryAreaService extends GenericService<MinistryArea> {

    protected valueToEntity(value: any): MinistryArea {
        return new MinistryArea(value);
    }

    protected getResourcePath(): string {
        return '/ministry-areas'
    }

    public publicFindAll(): Observable<MinistryArea[]> {
        return this.doRequest({
          url: environment.backendHost + environment.backendPublicApiPath + this.getResourcePath() + "/all",
          method: "GET",
          map: this.valueToEntity
        });
    }

}
