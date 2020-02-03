import {Injectable} from "@angular/core";
import {Phone} from "../domain/phone";
import {GenericService} from "../../core/service/generic.service";

@Injectable({providedIn: "root"})
export class PhoneService extends GenericService<Phone> {

  private phoneUrl = "/phones";


  protected valueToEntity(value: any): Phone {
    return new Phone(value);
  }

  protected getResourcePath(): string {
    return this.phoneUrl;
  }

}
