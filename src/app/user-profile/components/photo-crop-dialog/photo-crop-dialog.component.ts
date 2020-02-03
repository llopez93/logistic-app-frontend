import {Component, Inject, OnInit} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-photo-crop-dialog',
  templateUrl: './photo-crop-dialog.component.html',
  styleUrls: ['./photo-crop-dialog.component.scss'],
})
export class PhotoCropDialogComponent implements OnInit {

  imageBase64 = '';
  croppedImage = '';

  constructor(public dialogRef: MatDialogRef<PhotoCropDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.imageBase64 = this.data.image;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  confirm() {
    this.dialogRef.close(this.croppedImage);
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }



}
