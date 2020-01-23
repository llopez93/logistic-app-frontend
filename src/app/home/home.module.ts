import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeRoutingModule } from './home-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import {MatExpansionModule} from "@angular/material";
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';

@NgModule({
  declarations: [NavigationComponent, MenuComponent, SubMenuComponent],
  imports: [
    CommonModule,
    LayoutModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule

  ]
})
export class HomeModule { }
