import {Injectable} from '@angular/core';
import {Profile} from '../domain/profile';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {AuthService} from "../../core/security/service/auth.service";
import User from "../../core/domain/security/user";
import { throwError } from 'rxjs';

import {catchError, filter, switchMap, tap} from "rxjs/operators";
import {ProfileService} from "./profile-service.service";
import {ConfirmDialogService} from "../../core/commons/service/confirm-dialog.service";
@Injectable({providedIn: "root"})
export class ProfileStoreService {

  private _profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);

  profile: Observable<Profile>;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private confirmationService: ConfirmDialogService) {

    this.profile = this._profile.asObservable().pipe(filter(p => p != null))
    let userIn: User = null;
    this.authService.user
      .pipe(tap(user => userIn = user))
      .pipe(switchMap(user => of(new Profile())))// this.profileService.getByUserId(user.id)))
      .pipe(catchError(e => {
        if (e.status === 404) {
          return this.confirmProfileCreate()
            .pipe(switchMap(b => {
              const profile = new Profile();
              profile.firstname = userIn.firstName;
              profile.lastname = userIn.lastName;
              return of(profile);
            }))
        } else return throwError(e);
      }))
      .subscribe((profile: Profile) => this._profile.next(profile));


  }

  getProfile(): Observable<Profile> {
    return this._profile.asObservable().pipe(filter(p => p != null));
  }

  save(profile: Profile): Observable<Profile> {
    return !profile.id ?
      this.profileService.create(profile).pipe(tap(profile => this._profile.next(profile)))
      :
      this.profileService.update(profile).pipe(tap(profile => this._profile.next(profile)));
  }

  confirmProfileCreate(): Observable<boolean> {
    const confirm = new Subject<boolean>()
    this.confirmationService.showDialog({
      title: 'Crear un nuevo perfil',
      message: '¿Usted no posee un perfil de usuario ¿desea crearlo ahora?',
      onClose: () => {
        confirm.next(false);
        confirm.complete();
      },
      onAccept: () => {
        confirm.next(true);
        confirm.complete();
      }
    }).subscribe();
    return confirm.asObservable()
  }

}
