import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user/list/user-list.component";
import {UserFormComponent} from "./user/form/user-form.component";
import {RoleListComponent} from "./role/list/list.component";
import {RoleFormComponent} from "./role/form/role-form.component";


const routes: Routes = [
  {
    path: 'users', children: [
      {path: '', component: UserListComponent},
      {path: ':id', component: UserFormComponent}
    ]
  },
  {
    path: 'roles', children: [
      {path: '', component: RoleListComponent},
      {path: ':id', component: RoleFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
