import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Material} from "../../domain/material";
import {Provider} from "../../domain/provider";
import {Observable} from "rxjs";
import {MaterialPrice} from "../../domain/material-price";

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

  public getPricesByProvider(p: Provider): Observable<MaterialPrice[]> {
    const url = this.baseUrl + this.getResourcePath() + '/prices/by-provider/' + p.id;
    return this.doRequest({url, method: "GET", map: (data) => (data as []).map(x => new MaterialPrice(x))});
  }
}
