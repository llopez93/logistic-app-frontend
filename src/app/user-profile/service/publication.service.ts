import {Injectable} from "@angular/core";
import {Publication} from "../domain/publication";
import {GenericService} from "../../core/service/generic.service";

@Injectable({providedIn: "root"})
export class PublicationService extends GenericService<Publication> {

    private publicationUrl = "/publications";

    protected valueToEntity(value: any): Publication {
        return new Publication(value);
    }

    protected getResourcePath(): string {
        return this.publicationUrl;
    }


}
