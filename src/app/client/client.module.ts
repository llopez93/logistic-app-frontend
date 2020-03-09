import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientListComponent} from './component/list/client-list.component';
import {ClientFormComponent} from "./component/form/client-form.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {ClientRoutingModule} from "./client-routing.module";
import {FlexModule} from "@angular/flex-layout";
import {IConfig, NgxMaskModule} from "ngx-mask";

// export options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [ClientListComponent, ClientFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    ClientRoutingModule,
    FlexModule,
    MatSelectModule,
    NgxMaskModule.forRoot({}),
  ]
})
export class ClientModule {
}
