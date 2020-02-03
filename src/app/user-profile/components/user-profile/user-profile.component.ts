import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Profile} from "../../domain/profile";
import {ProfileStoreService} from "../../service/profile-store.service";
import {PhoneTypeService} from "../../service/phone-type.service";
import {CityService} from "../../service/city.service";
import {AreaOfInterestService} from "../../service/area-of-interest.service";
import {MinistryService} from "../../service/ministry.service";
import {MatDialog} from "@angular/material";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {Phone} from "../../domain/phone";
import {Address} from "../../domain/address";
import {SnackbarService} from "../../../core/service/snackbar.service";
import Entity from "../../../core/domain/entity";
import {PhotoCropDialogComponent} from "../photo-crop-dialog/photo-crop-dialog.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  profile: Profile = null;
  loading: boolean = true;
  profileFormGroup: FormGroup;

  citiesSelectItems: SelectItem[] = [{label: 'Selecciona una ciudad', value: null}];

  areasOfInterest: SelectItem[] = [{label: 'Selecciona un area de interes', value: null}];

  ministryAreas: SelectItem[] = [{label: 'Selecciona un area de trabajo', value: null}];
  ministries: SelectItem[] = [{label: 'Selecciona un area de trabajo', value: null}];

  phonetypesSelectItems: SelectItem[] = [{label: 'Selecciona un tipo', value: null}];

 // es: any = CALENDAR_LOCALE_ES;

  imagePreview = null;

  constructor(private fb: FormBuilder,
              private profileStore: ProfileStoreService,
              private phoneTypeService: PhoneTypeService,
              private cityService: CityService,
              private areaOfInterestService: AreaOfInterestService,
              private messageService: GlobalAppService,
              private snackbarService: SnackbarService,
              private router: Router,
              private ministryService: MinistryService,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog
  ) {
    this.profileFormGroup = this.fb.group({
      firstname: [ {value: ''}, Validators.required],
      lastname: [ {value: ''}, Validators.required],
      birthDate: [ {value: ''}, Validators.required],
      dni: [ {value: ''}, [Validators.required, Validators.minLength(7)] ],
      areaOfInterest: [ null ],
      workplace: this.fb.group({
        ministry: [ null, Validators.required ],
        street: [ {value: '', disabled: true}, Validators.required ],
        phone: [ {value: '', disabled: true}, [ Validators.required, Validators.minLength(8) ] ],
        city: [ {value: '', disabled: true}, Validators.required ]
      }),
      phonesArray: this.fb.array([], Validators.required),
      photo: ['']
    });


  }



  ngOnInit() {

    this.profileStore.getProfile().subscribe(profile => {
      this.setProfileForm(profile);
      this.imagePreview = profile.profilePhoto;
      this.loading = false;
      this.cd.markForCheck();
    });
    this.cityService.getAll().subscribe(cities => {
      const citiesSelect = cities.map(city => ({
        label: city.name + ', ' + city.province.name,
        value: city
      })) as SelectItem[];
      this.citiesSelectItems.push(...citiesSelect);
      this.cd.markForCheck();
    });
    this.phoneTypeService.getAll().subscribe(phoneTypes => {
      this.phonetypesSelectItems = phoneTypes.map(phoneType => ({
        label: phoneType.phoneType,
        value: phoneType
      }));
      this.cd.markForCheck();
    });
    this.areaOfInterestService.getAll().subscribe(areas => {
      this.areasOfInterest = this.areasOfInterest.concat(areas.map(area => ({
        label: area.name,
        value: area
      })));
      this.cd.markForCheck();
    });

    this.ministryService.getAll().subscribe(ministries => {
      this.ministries = this.ministries.concat(
        ministries.map(m => ({label: m.name, value: m})));
      this.cd.markForCheck();
    });

    if (this.profileFormGroup.get('workplace.ministry')) {
      this.profileFormGroup.get('workplace.street').enable();
      this.profileFormGroup.get('workplace.city').enable();
      this.profileFormGroup.get('workplace.phone').enable();
    };
    this.profileFormGroup.get('workplace.ministry').valueChanges
      .subscribe(s => {
        if (s) {
          this.profileFormGroup.get('workplace.street').enable();
          this.profileFormGroup.get('workplace.city').enable();
          this.profileFormGroup.get('workplace.phone').enable();
        }else {
          this.profileFormGroup.get('workplace.street').disable();
          this.profileFormGroup.get('workplace.city').disable();
          this.profileFormGroup.get('workplace.phone').disable();
        }
      })
  }

  ngAfterViewInit() {

  }

  changeArea(event) {
    if (event.value) {
      this.profileFormGroup.get("workplace").get("street").enable();
      this.profileFormGroup.get("workplace").get("phone").enable();
      this.profileFormGroup.get("workplace").get("city").setValue(event.value.address.city);
      this.profileFormGroup.patchValue({
        workplace: {
          street: event.value.address.street,
          city: event.value.address.city
        }
      });
    } else {
      this.profileFormGroup.get("workplace").get("street").disable();
      this.profileFormGroup.get("workplace").get("phone").disable();
      this.profileFormGroup.patchValue({
        workplace: {
          street: null,
          city: null,
          phone: null
        }
      });
    }

  }

  setProfileForm(profile: Profile) {

    this.profile = profile;
    this.profileFormGroup.patchValue({
      firstname: profile.firstname,
      lastname: profile.lastname,
      birthDate: new Date(profile.birthDate),
      dni: profile.dni,
      areaOfInterest: profile.areaOfInterest,
      workplace: {
        ministry: profile.ministry,
        street: profile.address.street,
        city: profile.address.city,
        phone: profile.workPhone ? profile.workPhone.phone : ''
      },
      phonesArray: []
    });
    this.setPhones(profile.phones);

  }

  setPhones(phones: Phone[]) {
    const phoneFGs = phones.map(phone => this.fb.group({
      id: phone.id,
      phone: phone.phone,
      phoneType: phone.phoneType
    }));
    const phoneFormArray = this.fb.array(phoneFGs);
    this.profileFormGroup.setControl('phonesArray', phoneFormArray);
  }

  get phonesArray(): FormArray {
    return this.profileFormGroup.get('phonesArray') as FormArray;
  };

  addPhone() {
    const phone = new Phone({phone: '', phoneType: this.phonetypesSelectItems[0].value});
    this.phonesArray.push(this.fb.group({
      phone: [phone.phone, Validators.required],
      phoneType: [phone.phoneType, Validators.required]
    }));
  }

  removePhone(i: number) {
    this.phonesArray.removeAt(i);
  }

  formToEntity(form: FormGroup): Profile {
    const formValue = form.value;
    return new Profile({
      id: this.profile.id,
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      dni: formValue.dni,
      birthDate: formValue.birthDate.getTime(),
      address: new Address({
        id: this.profile.address.id,
        street: formValue.workplace.street,
        city: formValue.workplace.city
      }),
      areaOfInterest: formValue.areaOfInterest,
      ministry: formValue.workplace.ministry,
      workPhone: new Phone({
        phone: formValue.workplace.phone,
        phoneType: this.phonetypesSelectItems.find(p => p.value.phoneType == 'Fijo').value
      }),
      phones: formValue.phonesArray,
      profilePhoto: formValue.photo ? formValue : this.imagePreview
    });

  }

  comparator(a: Entity, b: Entity): boolean {
    return a.equals(b);
  }

  onSubmit(event) {
    event.preventDefault();
    this.profile = this.formToEntity(this.profileFormGroup);
    this.profileStore.save(this.profile)
      .subscribe(profile => {
        this.showSuccessSaveMessage();
      }, err => {
        this.showErrorSaveMessages(err);
      });

    event.preventDefault();
  }

  onPhotoUpload(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = e => { // called once readAsDataURL is completed
      const photo = reader.result.toString();
       this.cd.markForCheck();
      const dialogRef = this.dialog.open(PhotoCropDialogComponent, {
        data: {image: photo}, width: '75%',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // get size in kb
          const length = (result.length * 0.75) / 1000
          // size for mediumblob
          if (length > 16000000) {
            this.snackbarService.show({
              title: "Error",
              body: "La imagen excede el tamaño máximo",
              type: "error"
            })
          } else {
            this.profileFormGroup.controls['photo'].setValue(result);
            this.imagePreview = result;
            this.cd.markForCheck();
          }
        }
      });

      this.cd.markForCheck();

    }

  }

  public showSuccessSaveMessage() {
    this.snackbarService.show({
      title: "Guardado",
      body: "Se ha guardado el perfil correctamente",
      type: "success"
    });
  }

  public showErrorSaveMessages(error: any) {
    this.snackbarService.show({
      title: "Error:",
      body: 'No sé ha podido guardar el perfil. ' + error.message,
      type: "success"
    });
  }

  goBack() {
    this.router.navigate(['']);
  }

}

type SelectItem = {
  label: string;
  value: any;
}
