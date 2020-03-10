import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProviderListComponent} from "./component/list/provider-list.component";
import {ProviderFormComponent} from "./component/form/provider-form.component";


const routes: Routes = [
  {path: '', component: ProviderListComponent},
  {path: ':id', component: ProviderFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {
}
