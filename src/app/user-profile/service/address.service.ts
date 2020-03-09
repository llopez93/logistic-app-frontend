import {Injectable} from "@angular/core";
import {GenericService} from "../../core/service/generic.service";
import {Address} from "../../core/domain/address/address";

@Injectable({providedIn: "root"})
export class AddressService extends GenericService<Address> {

    private addressUrl = "/address";

    protected valueToEntity(value: any): Address {
        return new Address(value);
    }

    protected getResourcePath(): string {
        return this.addressUrl;
    }

}
