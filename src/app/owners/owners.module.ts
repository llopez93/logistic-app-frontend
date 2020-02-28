import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { TruckListComponent } from './components/truck/truck-list/truck-list.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatTableModule, MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [TruckListComponent],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSelectModule,
  ]
})
export class OwnersModule { }
