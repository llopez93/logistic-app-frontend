import {Injectable} from "@angular/core";
import {Volunteer} from "../domain/volunteer";
import {GenericService} from "../../core/service/generic.service";


@Injectable({providedIn: "root"})
export class VolunteerService extends GenericService<Volunteer> {

    private volunteerUrl = "/volunteers";

    protected valueToEntity(value: any): Volunteer {
        return new Volunteer(value);
    }

    protected getResourcePath(): string {
        return this.volunteerUrl;
    }


}
