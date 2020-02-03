import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import {AuthGuard} from "../core/security/guard/auth.guard";


const routes: Routes = [
  {path: '', component: NavigationComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: 'user-profile', loadChildren: () => import('../user-profile/user-profile.module')
          .then(mod => mod.UserProfileModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
      {path: 'chat', loadChildren: () => import('../chat/chat.module').then(mod => mod.ChatModule)}
    ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }