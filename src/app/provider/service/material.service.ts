import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Material} from "../../domain/material";
import {Provider} from "../../domain/provider";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends GenericService<Material> {

  protected getResourcePath(): string {
    return "material";
  }

  protected valueToEntity(o: any): Material {
    return new Material(o);
  }

  public getByProvider(p: Provider): Observable<Material> {
    const url = this.baseUrl + this.getResourcePath() + '/by-provider/' + p.id;
    return this.doRequest({url, method: "GET", map: this.mapToEntityArray});
  }
}
