import {Injectable} from "@angular/core";
import {Course} from "../domain/course";
import {GenericService} from "../../core/service/generic.service";


@Injectable({providedIn: "root"})
export class CourseService extends GenericService<Course> {

    private courseUrl = "/courses";

    protected valueToEntity(value: any): Course {
        return new Course(value);
    }

    protected getResourcePath(): string {
        return this.courseUrl;
    }

}
