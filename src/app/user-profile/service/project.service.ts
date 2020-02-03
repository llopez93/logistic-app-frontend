import {Injectable} from "@angular/core";
import {Project} from "../domain/project";
import {GenericService} from "../../core/service/generic.service";
@Injectable({providedIn: "root"})
export class ProjectService extends GenericService<Project> {

    private projectUrl = "/projects";

    protected valueToEntity(value: any): Project {
        return new Project(value);
    }

    protected getResourcePath(): string {
        return this.projectUrl;
    }

}
