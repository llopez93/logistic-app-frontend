import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripFormComponent} from "./component/form/trip-form.component";


const routes: Routes = [
  {path: ":id", component: TripFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {
}
