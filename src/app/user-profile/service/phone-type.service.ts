import {Injectable} from "@angular/core";
import {PhoneType} from "../domain/phoneType";
import {GenericService} from "../../core/service/generic.service";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: "root"})
export class PhoneTypeService extends GenericService<PhoneType> {

    private phoneTypeUrl = "/phoneTypes";

    constructor(protected http: HttpClient) {
      super(http);
    }

    protected valueToEntity(value: any): PhoneType {
        return new PhoneType(value);
    }

    protected getResourcePath(): string {
        return this.phoneTypeUrl;
    }



}
