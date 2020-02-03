import {Injectable} from "@angular/core";
import {Certification} from "../domain/certification";
import {GenericService} from "../../core/service/generic.service";


@Injectable({providedIn: "root"})
export class CertificationService extends GenericService<Certification> {

    private certificationUrl = "/certifications";


    protected valueToEntity(value: any): Certification {
        return new Certification(value);
    }

    protected getResourcePath(): string {
        return this.certificationUrl;
    }



}
