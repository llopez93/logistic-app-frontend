import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationMessages} from "../../../core/service/validation-messages";
import {PhoneType} from "../../../client/domain/phone-type";
import {Observable} from "rxjs";
import {Province} from "../../../core/domain/address/province";
import {City} from "../../../core/domain/address/city";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CityService} from "../../../core/service/city.service";
import {ProvinceService} from "../../../core/service/province.service";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {Client} from "../../../client/domain/client";
import {Address} from "../../../core/domain/address/address";
import {ProviderService} from "../../service/provider.service";
import {Provider} from "../../../domain/provider";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {ClientService} from "../../../client/service/client.service";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {MaterialUnitType} from "../../../domain/material.unit.type";

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
  providers: [CityService, ProvinceService, ClientService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderFormComponent implements OnInit {

  providerForm: FormGroup;
  validation: ValidationMessages = new ValidationMessages();
  phoneTypes: string[] = Object.values(PhoneType);
  unitTypes: string[] = Object.values(MaterialUnitType);

  provincesAsync: Observable<Province[]>;
  citiesAsync: Observable<City[]>;

  cuilSearchControl: FormControl;
  clientsAsync: Observable<Provider[]>;

  constructor(private readonly cd: ChangeDetectorRef,
              private readonly router: Router,
              private readonly appService: GlobalAppService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly providerService: ProviderService,
              private readonly cityService: CityService,
              private readonly provinceService: ProvinceService,
              private readonly clientService: ClientService) {

    this.providerForm = fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(1)]],
      socialReason: ["", [Validators.required, Validators.minLength(1)]],
      cuil: ["", [Validators.required, Validators.minLength(1)]],
      phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.validation.isNumber()]],
      phoneType: ["", [Validators.required]],
      email: [null, Validators.email],
      address: fb.group({
          id: [null],
          street: ["", [Validators.required, Validators.minLength(1)]],
          number: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(6), this.validation.isNumber()]],
          city: [null, Validators.required],
          province: [null]
        }
      ),
      materials: fb.array([])
    });

    this.cuilSearchControl = new FormControl('');
  }

  ngOnInit() {
    this.provincesAsync = this.provinceService.getAll();

    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.providerService.get(id))
    ).subscribe(provider => {
      this.providerForm.patchValue(provider);
      this.providerForm.get("address").get("province").patchValue(provider.address.city.province);
      const array = provider.materials.map(m => {;
        return this.fb.group({
          id: [m.id],
          unit: [m.unit, Validators.required],
          name: [m.name, Validators.required]
        });
      });
      this.providerForm.setControl("materials", this.fb.array(array));
    });

    this.providerForm.get("address").get("province").valueChanges.subscribe(() => {
      this.citiesAsync = this.cityService.getCitiesByProvinceId(this.providerForm.get("address").get("province").value.id);
    });

    this.clientsAsync = this.cuilSearchControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(e => e !== ""),
        distinctUntilChanged(),
        switchMap(value => this.providerService.findByCuil(value))
      );

  }

  saveData() {
    let response: Observable<any>;
    const {province, ...addressData} = this.providerForm.get("address").value;
    const {address, ...clientData} = this.providerForm.value;
    const c = new Client(clientData);
    c.address = new Address(addressData);
    if (this.isEdition())
      response = this.providerService.update(null);
    else
      response = this.providerService.create(null);

    response.subscribe(() =>
      this.router.navigate(["home", "clients"])
    );

  }

  isEdition(): boolean {
    return this.providerForm.get("id").value !== null;
  }

  goBack() {
    this.router.navigate(["home", "clients"]);
  }

  compareProvince(p1: Province, p2: Province): boolean {
    if (p1 instanceof Province)
      return p1.compareTo(p2);
    else
      return new Province(p1).compareTo(p2);
  }

  compareCity(c1: City, c2: City): boolean {
    if (c1 instanceof City)
      return c1.compareTo(c2);
    else
      return new City(c1).compareTo(c2);
  }

  findClientById(event: MatAutocompleteSelectedEvent) {
    this.appService.setLoading(true);
    const p: Provider = event.option.value;
    this.clientService.get(p.id).subscribe(clientInfo => {
      this.providerForm.patchValue(clientInfo);
      this.providerForm.get("address").get("province").patchValue(clientInfo.address.city.province);
      this.appService.setLoading(false);
    });
  }

  addMaterial(): void {
    (this.providerForm.get("materials") as FormArray).push(this.fb.group({
      unit: ['', Validators.required],
      name: ['', Validators.required]
    }));
  }
}
