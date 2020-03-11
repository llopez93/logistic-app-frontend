import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Material} from "../../domain/material";

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
}
