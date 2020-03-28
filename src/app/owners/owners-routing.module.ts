import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TruckListComponent } from "./components/truck/truck-list/truck-list.component";
import { TruckFormComponent } from "./components/truck/truck-form/truck-form.component";
import { OwnerListComponent } from "./components/owner/list/owner-list.component";
import { OwnerFormComponent } from "./components/owner/form/owner-form.component";

const routes: Routes = [
  {
    path: "persons",
    children: [
      { path: "", component: OwnerListComponent },
      { path: ":id", component: OwnerFormComponent }
    ]
  },
  {
    path: "trucks",
    children: [
      { path: "", component: TruckListComponent },
      { path: ":id", component: TruckFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule {}
