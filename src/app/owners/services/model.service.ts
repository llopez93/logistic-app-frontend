import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import Model from '../domain/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends GenericService<Model> {

  protected getResourcePath(): string {
    return "models";
  }

  protected valueToEntity(o: any): Model {
    return new Model(o);
  }
}
