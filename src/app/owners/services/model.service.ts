import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import Model from '../domain/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends GenericService<Model> {

  private modelUrl = 'models';

  protected getResourcePath(): string {
    return "models";
  }

  protected valueToEntity(o: any): Model {
    return new Model(o);
  }

  public findByBrand(brandId: number): Observable<Model[]> {
    return this.doRequest({
      url: this.baseUrl + this.modelUrl + '/by-brand/' + brandId,
      method: 'GET',
    });
  }
}
