import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {ProfileStoreService} from "../../../user-profile/service/profile-store.service";

const DEFAULT_PHOTO = "assets/images/user-avatar.png";

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
})
export class UserPhotoComponent implements AfterViewInit, OnChanges {

  @Input('photo') profilePhoto?;
  @Input() size? = 80;
  loading = true;
  @Input()
  ownPhoto? = true;

  constructor(private store: ProfileStoreService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.check();
  }

  ngAfterViewInit() {
    this.check();
  }

  check(){
    this.loading = true;
    if(!this.profilePhoto && this.ownPhoto) {
      this.store.getProfile().subscribe(p => {
        if (p.profilePhoto)
          this.profilePhoto = p.profilePhoto;
        else{
          this.profilePhoto = DEFAULT_PHOTO
        }
        this.loading = false;
      })
    } else if(!this.profilePhoto) {
      this.profilePhoto = DEFAULT_PHOTO;
      this.loading = false;
    } else {
      this.loading = false;
    }

  }

}
