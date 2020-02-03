import {Injectable} from "@angular/core";
import {Province} from "../domain/province";
import {GenericService} from "../../core/service/generic.service";
import {AuthService} from "../../core/security/service/auth.service";

@Injectable({providedIn: "root"})
export class ProvinceService extends GenericService<Province> {

    private provinceUrl = "/provinces";

    protected valueToEntity(value: any): Province {
        return new Province(value);
    }

    protected getResourcePath(): string {
        return this.provinceUrl;
    }


}
