import {Component, OnInit} from '@angular/core';
import {ValidationMessages} from "../../../../core/service/validation-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

import Truck from '../../../domain/truck';
import {TruckService} from "../../../services/truck.service";
import Model from '../../../domain/model';
import {ModelService} from "../../../services/model.service";
import Brand from '../../../domain/brand';
import {BrandService} from "../../../services/brand.service";


@Component({
  selector: 'app-truck-form',
  templateUrl: './truck-form.component.html',
  styleUrls: ['./truck-form.component.scss']
})
export class TruckFormComponent implements OnInit {

  truckForm: FormGroup;
  modelsAsync: Observable<Model[]>;
  brandsAsync: Observable<Brand[]>;
  validation: ValidationMessages = new ValidationMessages();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly truckService: TruckService,
    private readonly modelService: ModelService,
    private readonly brandService: BrandService
  ) {
    this.truckForm = fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(1)]],
      domain: ["", [Validators.required, Validators.minLength(1)]],
      year: ["", [Validators.required, Validators.minLength(1), Validators.min(1900)]],
      model: [null, Validators.required],
      brand: [null]
    });
  }

  ngOnInit() {

    this.truckForm.get("brand").valueChanges.subscribe(value => {
      this.modelsAsync = this.modelService.findByBrand(value.id);
    });

    this.brandsAsync = this.brandService.getAll();
    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.truckService.get(id)),
    )
      .subscribe(truck => {
        this.truckForm.patchValue(truck);
        this.truckForm.get("brand").patchValue(truck.model.brand);
      });
  }

  saveData() {
    let response: Observable<any>;
    const {brand, ...data} = this.truckForm.value;
    if (this.isEdition())
      response = this.truckService.update(new Truck(data));
    else
      response = this.truckService.create(data);

    response.subscribe(() =>
      this.goBack()
    );
  }

  findByBrand(brandId: number) {
    this.modelsAsync = this.modelService.findByBrand(brandId);
  }

  compareModel(model1: Model, model2: Model): boolean {
    if (model1 instanceof Model)
      return model1.compareTo(model2);
    else
      return new Model(model1).compareTo(model2);
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

}
