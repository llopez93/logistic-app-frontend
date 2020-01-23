import {Injectable} from '@angular/core';
import {GenericService} from "../../service/generic.service";
import {FX} from "../../domain/fx";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class FxService extends GenericService<FX> {

    private resourcePath = "/fx";

    constructor(protected http: HttpClient) {
        super(http);
    }

    protected getResourcePath(): string {
        return this.resourcePath;
    }

}
