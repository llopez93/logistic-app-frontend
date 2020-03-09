import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationMessages} from "../../../core/service/validation-messages";
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {ClientService} from "../../service/client.service";
import {Client} from "../../domain/client";
import {PhoneType} from "../../domain/phone-type";
import {Province} from "../../../core/domain/address/province";
import {City} from "../../../core/domain/address/city";
import {ProvinceService} from "../../../core/service/province.service";
import {CityService} from "../../../core/service/city.service";
import {Address} from "../../../core/domain/address/address";

@Component({
  selector: 'app-form-list',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  providers: [CityService, ProvinceService]
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  validation: ValidationMessages = new ValidationMessages();
  phoneTypes: string[] = Object.values(PhoneType);

  provincesAsync: Observable<Province[]>;
  citiesAsync: Observable<City[]>;

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly clientService: ClientService,
              private readonly cityService: CityService,
              private readonly provinceService: ProvinceService) {

    this.clientForm = fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(1)]],
      socialReason: ["", [Validators.required, Validators.minLength(1)]],
      cuil: ["", [Validators.required, Validators.minLength(1)]],
      phone: ["", [Validators.required, Validators.minLength(10),Validators.maxLength(10), this.validation.isNumber()]],
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
    });
  }
  ngOnInit() {
    this.provincesAsync = this.provinceService.getAll();

    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.clientService.get(id))
    ).subscribe(client => {
      this.clientForm.patchValue(client);
      this.clientForm.get("address").get("province").patchValue(client.address.city.province);
    });

    this.clientForm.get("address").get("province").valueChanges.subscribe(() => {
      this.citiesAsync = this.cityService.getCitiesByProvinceId(this.clientForm.get("address").get("province").value.id);
    });
  }

  saveData() {
    let response: Observable<any>;
    const {province, ...addressData } = this.clientForm.get("address").value;
    const {address, ...clientData } = this.clientForm.value;
    const c = new Client(clientData);
    c.address = new Address(addressData);
    if (this.isEdition())
      response = this.clientService.update(c);
    else
      response = this.clientService.create(c);

    response.subscribe(() =>
      this.router.navigate(["home", "clients"])
    );

  }

  isEdition(): boolean {
    return this.clientForm.get("id").value !== null;
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
}
