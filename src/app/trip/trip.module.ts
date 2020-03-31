import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripFormComponent } from './component/form/trip-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule, MatTableModule
} from "@angular/material";
import {FlexModule} from "@angular/flex-layout";
import {AppCommonsModule} from "../core/commons/commons.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import { LatestListComponent } from './component/latest-list/latest-list.component';


@NgModule({
  declarations: [TripFormComponent, LatestListComponent],
  imports: [
    CommonModule,
    TripRoutingModule,
    MatCardModule,
    MatDividerModule,
    FlexModule,
    MatFormFieldModule,
    MatSelectModule,
    AppCommonsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot({}),
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ]
})
export class TripModule { }
