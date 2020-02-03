import {Injectable} from "@angular/core";
import {Education} from "../domain/education";
import {GenericService} from "../../core/service/generic.service";

@Injectable({providedIn: "root"})
export class EducationService extends GenericService<Education> {

    private educationUrl = "/educations";


    protected valueToEntity(value: any): Education {
        return new Education(value);
    }

    protected getResourcePath(): string {
        return this.educationUrl;
    }


}
