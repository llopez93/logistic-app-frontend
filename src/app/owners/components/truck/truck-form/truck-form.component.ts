import { Component, OnInit } from '@angular/core';
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
      model: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.brandsAsync = this.brandService.getAll();
    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.truckService.get(id))
    ).subscribe(truck => {
      this.truckForm.patchValue(truck);
    });
  }

  saveData() {
    let response: Observable<any>;
    if (this.isEdition())
      response = this.truckService.update(new Truck(this.truckForm.value));
    else
      response = this.truckService.create(this.truckForm.value);

    response.subscribe(() =>
      this.goBack()
    );
  }

  findByBrand(brandId: number) {
    this.modelsAsync = this.modelService.findByBrand(brandId);
  }

  compareModel(model1: Model, model2: Model): boolean {
    console.log(model1);
    return model1.compareTo(model2);
  }

  // compareToBrandName(brand1: Model, brand2: Model): boolean {
  //   return brand1.compareToBrandName(brand2);
  // }

  isEdition(): boolean {
    return this.truckForm.get("id").value !== null;
  }

  goBack() {
    this.router.navigate(["home", "owners", "trucks"]);
  }

}
