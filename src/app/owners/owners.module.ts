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
  MatTooltipModule,
  MatSlideToggleModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TruckFormComponent } from "./components/truck/truck-form/truck-form.component";
import { OwnerListComponent } from "./components/owner/list/owner-list.component";
import { OwnerFormComponent } from "./components/owner/form/owner-form.component";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [
    TruckListComponent,
    TruckFormComponent,
    OwnerListComponent,
    OwnerFormComponent
  ],
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
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot({}),
  ]
})
export class OwnersModule {}
