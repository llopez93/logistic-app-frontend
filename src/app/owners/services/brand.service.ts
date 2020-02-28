import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import Brand from '../domain/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends GenericService<Brand> {

  protected getResourcePath(): string {
    return "brands";
  }

  protected valueToEntity(o: any): Brand {
    return new Brand(o);
  }
}
