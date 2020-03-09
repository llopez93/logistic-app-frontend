import {Injectable} from "@angular/core";
import {GenericService} from "../../core/service/generic.service";
import {Province} from "../domain/address/province";

@Injectable()
export class ProvinceService extends GenericService<Province> {

  private provinceUrl = "address/province";

  protected valueToEntity(value: any): Province {
    return new Province(value);
  }

  protected getResourcePath(): string {
    return this.provinceUrl;
  }


}
