import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {CurriculumComponent} from "./components/curriculum/curriculum.component";
import {SettingsComponent} from "./components/settings/settings.component";


const routes: Routes = [
  {path: '', component: UserProfileComponent},
  {path: 'curriculum', component: CurriculumComponent},
  {path: 'settings', component: SettingsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
