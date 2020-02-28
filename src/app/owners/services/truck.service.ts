import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import Truck from '../domain/truck';

@Injectable({
  providedIn: 'root'
})
export class TruckService extends GenericService<Truck> {

  protected getResourcePath(): string {
    return "trucks";
  }

  protected valueToEntity(o: any): Truck {
    return new Truck(o);
  }
}
