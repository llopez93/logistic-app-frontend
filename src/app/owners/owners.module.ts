import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OwnersRoutingModule } from "./owners-routing.module";
import { TruckListComponent } from "./components/truck/truck-list/truck-list.component";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TruckFormComponent } from "./components/truck/truck-form/truck-form.component";
import { OwnerListComponent } from './components/owner/list/owner-list.component';

@NgModule({
  declarations: [TruckListComponent, TruckFormComponent, OwnerListComponent],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    MatAutocompleteModule,
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
    MatProgressSpinnerModule
  ]
})
export class OwnersModule {}
