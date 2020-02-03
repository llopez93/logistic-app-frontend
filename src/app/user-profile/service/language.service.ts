import {Injectable} from "@angular/core";
import {Language} from "../domain/language";
import {GenericService} from "../../core/service/generic.service";


@Injectable({providedIn: "root"})
export class LanguageService extends GenericService<Language> {

    private languageUrl = "/languages";


    protected valueToEntity(value: any): Language {
        return new Language(value);
    }

    protected getResourcePath(): string {
        return this.languageUrl;
    }

}
