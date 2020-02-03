import {Injectable} from '@angular/core';
import {CurriculumVitae} from "../domain/curriculumVitae";
import {CurriculumVitaeService} from "./curriculum-vitae.service";
import {BehaviorSubject, Observable, of, Subject, throwError} from "rxjs";
import {AuthService} from "../../core/security/service/auth.service";
import {catchError, filter, switchMap, tap} from "rxjs/operators";

@Injectable({providedIn: "root"})

export class CurriculumStoreService {

    private subjectCV: BehaviorSubject<CurriculumVitae> = new BehaviorSubject<CurriculumVitae>(null);

    constructor(private authService: AuthService,
                private cvService: CurriculumVitaeService,
                //TODO ConfirmationService
                /*private confirmationService: ConfirmationService*/) {
        this.authService.user
          .pipe(switchMap(user => this.cvService.getByUserId(user.id)))
          .pipe(catchError(e => {
            if (e.status === 404) {
              return of(new CurriculumVitae());
            } else return throwError(e);
          })).subscribe((cv: CurriculumVitae) => this.subjectCV.next(cv));
    }

    getCurriculumVitae(): Observable<CurriculumVitae> {
        return this.subjectCV.asObservable().pipe(filter(p => p != null))
    }

    save(cv: CurriculumVitae): Observable<CurriculumVitae> {
        if (!cv.id)
            return this.cvService.create(cv).pipe(tap(cv => this.subjectCV.next(cv)));
        else
            return this.cvService.update(cv).pipe(tap(cv => this.subjectCV.next(cv)));
    }

    confirmCVCreate(): Observable<boolean> {
        const confirm = new Subject<boolean>()
        //TODO ConfirmationService
        /*this.confirmationService.confirm({
            header: 'Crear un curriculum vitae',
            message: 'Usted no posee un curriculum vitae ¿desea crearlo ahora?',
            icon: 'fa ui-icon-add-circle-outline',
            accept: () => {
                confirm.next(true);
                confirm.complete();
            },
            reject: () => {
                confirm.next(false);
                confirm.complete();
            }
        })*/
        return confirm.asObservable()
    }

}
