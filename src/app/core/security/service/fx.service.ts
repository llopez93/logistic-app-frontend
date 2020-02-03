import {Injectable} from '@angular/core';
import {GenericService} from "../../service/generic.service";
import {FX} from "../../domain/security/fx";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class FxService extends GenericService<FX> {

  protected valueToEntity(o: any): FX {
    return new FX(o);
  }

  private resourcePath = "/fx";

    constructor(protected http: HttpClient) {
        super(http);
    }

    protected getResourcePath(): string {
        return this.resourcePath;
    }

}
