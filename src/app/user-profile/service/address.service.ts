import {Injectable} from "@angular/core";
import {Address} from "../domain/address";
import {GenericService} from "../../core/service/generic.service";

@Injectable({providedIn: "root"})
export class AddressService extends GenericService<Address> {

    private addressUrl = "/addresses";

    protected valueToEntity(value: any): Address {
        return new Address(value);
    }

    protected getResourcePath(): string {
        return this.addressUrl;
    }

}
