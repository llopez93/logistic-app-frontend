import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Trip} from "../../domain/trip";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripService extends GenericService<Trip> {

  protected getResourcePath(): string {
    return "trip";
  }

  protected valueToEntity(o: any): Trip {
    return new Trip(o);
  }

  public createTrip(tripData: Partial<Trip>, lapCount: number): Observable<Trip[]> {
    tripData.tripDate = (tripData.tripDate as Date).getTime();
    const url = this.baseUrl + this.getResourcePath();
    return this.doRequest({url, method: "POST", options: {body: {data: tripData, laps: lapCount}}, map: this.mapToEntityArray});
  }
}
