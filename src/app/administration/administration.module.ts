import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './user/list/user-list.component';
import {AdministrationRoutingModule} from "./administration-routing.module";
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
import { UserFormComponent } from './user/form/user-form.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { RoleListComponent } from './role/list/list.component';
import { RoleFormComponent } from './role/form/role-form.component';


@NgModule({
  declarations: [UserListComponent, UserFormComponent, RoleListComponent, RoleFormComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
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
export class AdministrationModule {
}
