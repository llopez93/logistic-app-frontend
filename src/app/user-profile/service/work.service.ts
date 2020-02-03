import {Injectable} from "@angular/core";
import {Work} from "../domain/work";
import {GenericService} from "../../core/service/generic.service";


@Injectable({providedIn: "root"})
export class WorkService extends GenericService<Work> {

    private workUrl = "/works";

    protected valueToEntity(value: any): Work {
        return new Work(value);
    }

    protected getResourcePath(): string {
        return this.workUrl;
    }


}
