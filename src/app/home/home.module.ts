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
import {MatBadgeModule, MatCardModule, MatExpansionModule, MatMenuModule, MatRippleModule} from "@angular/material";
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import {HomeComponent} from "./home.component";
import { SidenavProfileComponent } from './components/sidenav-profile/sidenav-profile.component';
import {AppCommonsModule} from "../core/commons/commons.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [HomeComponent, NavigationComponent, MenuComponent, SubMenuComponent, SidenavProfileComponent],
  imports: [
    CommonModule,
    LayoutModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    FlexLayoutModule,
    AppCommonsModule,
    MatMenuModule,
    MatBadgeModule,
    MatCardModule,
    MatRippleModule
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
