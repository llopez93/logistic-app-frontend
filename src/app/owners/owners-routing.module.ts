import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TruckListComponent } from './components/truck/truck-list/truck-list.component';

const routes: Routes = [
  {
    path: '', component: TruckListComponent, children: [
      {
        path: 'trucks', component: TruckListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
