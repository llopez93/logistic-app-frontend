import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientListComponent} from "./component/list/client-list.component";
import {ClientFormComponent} from "./component/form/client-form.component";


const routes: Routes = [
    {path: '', component: ClientListComponent},
    {path: ':id', component: ClientFormComponent}
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
