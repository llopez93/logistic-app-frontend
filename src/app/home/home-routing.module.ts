import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {AuthGuard} from "../core/security/guard/auth.guard";


const routes: Routes = [
  {
    path: '', component: NavigationComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {
        path: 'user-profile',
        loadChildren: () => import('../user-profile/user-profile.module').then(mod => mod.UserProfileModule),
        canActivate: [AuthGuard], canActivateChild: [AuthGuard]
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(mod => mod.ChatModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('../administration/administration.module').then(mod => mod.AdministrationModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('../client/client.module').then(mod => mod.ClientModule)
      },
      {
        path: 'providers',
        loadChildren: () => import('../provider/provider.module').then(mod => mod.ProviderModule)
      },
      {
        path: 'owners',
        loadChildren: () => import('../owners/owners.module').then(mod => mod.OwnersModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('../trip/trip.module').then(mod => mod.TripModule)
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
