import {ChangeDetectorRef, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialog,
  MatDialogModule, MatDividerModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatProgressBarModule,
  MatSelectModule, MatSlideToggleModule, MatTabsModule, MatTooltipModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AreaOfInterestService} from "./service/area-of-interest.service";
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import {PhotoCropDialogComponent} from "./components/photo-crop-dialog/photo-crop-dialog.component";
import {ImageCropperModule} from "ngx-image-cropper";
import { SettingsComponent } from './components/settings/settings.component';



@NgModule({
  declarations: [UserProfileComponent, CurriculumComponent, PhotoCropDialogComponent, SettingsComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    ImageCropperModule,
    MatTabsModule,
    MatDividerModule
  ],
  entryComponents: [PhotoCropDialogComponent]
})
export class UserProfileModule { }

