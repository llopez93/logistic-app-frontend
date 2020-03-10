import { Injectable } from "@angular/core";
import Owner from "../domain/owner";
import { GenericService } from "src/app/core/service/generic.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OwnerService extends GenericService<Owner> {
  protected getResourcePath(): string {
    return "owners";
  }

  protected valueToEntity(o: any): Owner {
    return new Owner(o);
  }

  public findByCuil(cuil: string): Observable<Owner[]> {
    const url = this.baseUrl + this.getResourcePath() + '/by-cuil/' + cuil;
    return this.doRequest({url, method: "GET", map: this.mapToEntityArray});
  }
}
