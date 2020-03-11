import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProviderRoutingModule} from './provider-routing.module';
import {ProviderListComponent} from './component/list/provider-list.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule, MatSlideToggleModule,
    MatTableModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {ProviderFormComponent} from './component/form/provider-form.component';
import {NgxMaskModule} from "ngx-mask";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [ProviderListComponent, ProviderFormComponent],
    imports: [
        CommonModule,
        ProviderRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        NgxMaskModule.forRoot({}),
        FlexModule,
        MatAutocompleteModule,
        MatSlideToggleModule
    ]
})
export class ProviderModule {
}
