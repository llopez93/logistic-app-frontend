import { Component, OnInit } from "@angular/core";
import { ValidationMessages } from "../../../../core/service/validation-messages";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  filter,
  map,
  switchMap,
  debounceTime,
  tap,
  finalize,
  distinctUntilChanged
} from "rxjs/operators";
import { Observable } from "rxjs";

import Truck from "../../../domain/truck";
import { TruckService } from "../../../services/truck.service";
import Model from "../../../domain/model";
import { ModelService } from "../../../services/model.service";
import Brand from "../../../domain/brand";
import { BrandService } from "../../../services/brand.service";
import Owner from "src/app/owners/domain/owner";
import { OwnerService } from "src/app/owners/services/owner.service";
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { GlobalAppService } from 'src/app/core/commons/service/global-app.service';

@Component({
  selector: "app-truck-form",
  templateUrl: "./truck-form.component.html",
  styleUrls: ["./truck-form.component.scss"]
})
export class TruckFormComponent implements OnInit {
  truckForm: FormGroup;
  modelsAsync: Observable<Model[]>;
  brandsAsync: Observable<Brand[]>;
  validation: ValidationMessages = new ValidationMessages();
  // Buscador propietarios
  cuilSearchControl: FormControl;
  filteredOwners: Owner[] = [];
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly appService: GlobalAppService,
    private readonly truckService: TruckService,
    private readonly modelService: ModelService,
    private readonly brandService: BrandService,
    private readonly ownerService: OwnerService
  ) {
    this.truckForm = fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(1)]],
      domain: ["", [Validators.required, Validators.minLength(1)]],
      year: [
        "",
        [Validators.required, Validators.minLength(1), Validators.min(1900)]
      ],
      model: [null, Validators.required],
      brand: [null],
      owner: fb.group({
        id: [null],
        firstName: ["", [Validators.required, Validators.minLength(1)]],
        lastName: ["", [Validators.required, Validators.minLength(1)]],
        cuil: [
          "",
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11)
          ]
        ],
        email: [null, Validators.email]
      })
    });

    this.cuilSearchControl = new FormControl('');
  }

  ngOnInit() {
    // Obtener la marca segun el modelo del camion
    this.truckForm.get("brand").valueChanges.subscribe(value => {
      this.modelsAsync = this.modelService.findByBrand(value.id);
    });

    // Obtener el propietario segun el CUIL
    this.cuilSearchControl
      .valueChanges.pipe(
        debounceTime(500),
        tap(() => (this.isLoading = true)),
        filter(e => e !== ""),
        distinctUntilChanged(),
        switchMap((value: string) =>
          this.ownerService
            .findByCuil(value)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe(owners => (this.filteredOwners = owners));

    this.brandsAsync = this.brandService.getAll();
    const action: Observable<Params> = this.activatedRoute.params;
    action
      .pipe(
        filter(data => data.id !== "new"),
        map(data => data.id),
        switchMap(id => this.truckService.get(id))
      )
      .subscribe(truck => {
        this.truckForm.patchValue(truck);
        this.truckForm.get("brand").patchValue(truck.model.brand);
      });
  }

  saveData() {
    let response: Observable<any>;
    const { brand, ...data } = this.truckForm.value;
    console.log(data);
    if (this.isEdition()) response = this.truckService.update(new Truck(data));
    else response = this.truckService.create(data);

    response.subscribe(() => this.goBack());
  }

  findByBrand(brandId: number) {
    this.modelsAsync = this.modelService.findByBrand(brandId);
  }

  compareModel(model1: Model, model2: Model): boolean {
    if (model1 instanceof Model) return model1.compareTo(model2);
    else return new Model(model1).compareTo(model2);
  }

  compareToBrandName(brand1: Brand, brand2: Brand): boolean {
    return brand1.compareTo(brand2);
  }

  isEdition(): boolean {
    return this.truckForm.get("id").value !== null;
  }

  goBack() {
    this.router.navigate(["home", "owners", "trucks"]);
  }

  displayFnOwner(owner: Owner) {
    if (owner) {
      return `${owner.cuil} - ${owner.lastName}, ${owner.firstName}`;
    }
  }

  // Rellena los campos del propietario
  findOwnerById(event: MatAutocompleteSelectedEvent) {
    this.appService.setLoading(true);
    const owner: Owner = event.option.value;
    this.ownerService.get(owner.id).subscribe(ownerInfo => {
      this.truckForm.get("owner").patchValue(ownerInfo);
      // Borrar campo cuilSearchControl
      // this.cuilSearchControl = new FormControl('');
      this.appService.setLoading(false);
    });
  }
}
