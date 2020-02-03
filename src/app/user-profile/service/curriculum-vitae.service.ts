import {Injectable} from "@angular/core";
import {CurriculumVitae} from "../domain/curriculumVitae";
import {GenericService} from "../../core/service/generic.service";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class CurriculumVitaeService extends GenericService<CurriculumVitae> {

    private curriculumVitaeUrl = "/curriculumvitaes";

    protected valueToEntity(value: any): CurriculumVitae {
        return new CurriculumVitae(value);
    }

    protected getResourcePath(): string {
        return this.curriculumVitaeUrl;
    }

    getByUserId(id :number): Observable<CurriculumVitae>{
      return this.doRequest({
        url: this.baseUrl + this.curriculumVitaeUrl + "/user/" + id,
        method: "GET",
        map: this.valueToEntity
      });
    }

}
