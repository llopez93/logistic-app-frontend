import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import Truck from '../domain/truck';
import { Observable } from 'rxjs';

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

  public findByOwner(ownerId: number): Observable<Truck[]> {
    const url = this.baseUrl + this.getResourcePath() + '/by-owner/' + ownerId;
    return this.doRequest({url, method: "GET", map: this.mapToEntityArray});
  }
}
