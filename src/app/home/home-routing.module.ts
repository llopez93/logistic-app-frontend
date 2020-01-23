import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import {AuthGuard} from "../core/security/guard/auth.guard";
import {MenuComponent} from "./components/menu/menu.component";


const routes: Routes = [
  {path: '', component: NavigationComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
