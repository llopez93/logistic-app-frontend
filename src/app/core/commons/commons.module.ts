import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPhotoComponent} from "./user-photo/user-photo.component";
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatProgressSpinnerModule} from "@angular/material";
import {MatSelectSearchComponent} from './mat-select-search/mat-select-search.component';

/*
*  Poner en este modulo componentes que se usen en varios modulos de la aplicacion
*
* */

@NgModule({
  declarations: [UserPhotoComponent, ConfirmDialogComponent, MatSelectSearchComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    UserPhotoComponent,
    MatSelectSearchComponent
  ]
})
export class AppCommonsModule {
}
