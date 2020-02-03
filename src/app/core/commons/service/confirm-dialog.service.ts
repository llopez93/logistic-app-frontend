import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent, ConfirmDialogData} from "../confirm-dialog/confirm-dialog.component";
import {Observable, of, throwError} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(public dialog: MatDialog) { }

  public showDialog(data : ConfirmDialogData, width = 350) : Observable<boolean> {
    let dialog = this.dialog.open(ConfirmDialogComponent, {width : width+'px', data : data});
    return dialog.afterClosed().pipe(
      tap(accept => {
        if(accept && data.onAccept) data.onAccept();
        if(!accept && data.onClose) data.onClose();
      }),
      filter(accept => accept)
    );
  }
}
