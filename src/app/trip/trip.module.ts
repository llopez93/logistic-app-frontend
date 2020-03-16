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
  MatSlideToggleModule
} from "@angular/material";
import {FlexModule} from "@angular/flex-layout";
import {AppCommonsModule} from "../core/commons/commons.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [TripFormComponent],
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
  ]
})
export class TripModule { }
