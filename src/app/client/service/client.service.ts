import {Injectable} from '@angular/core';
import {GenericService} from "../../core/service/generic.service";
import {Client} from "../domain/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService<Client> {

  protected getResourcePath(): string {
    return "client";
  }

  protected valueToEntity(o: any): Client {
    return new Client(o);
  }

}
