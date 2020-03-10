import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Provider} from "../../domain/provider";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends GenericService<Provider> {

  protected getResourcePath(): string {
    return "provider";
  }

  protected valueToEntity(o: any): Provider {
    return new Provider(o);
  }

  public findByCuil(cuil: string): Observable<Provider[]> {
    const url = this.baseUrl + this.getResourcePath() + '/by-cuil/' + cuil;
    return this.doRequest({url, method: "GET", map: this.mapToEntityArray});
  }

}
