import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationMessages } from "src/app/core/service/validation-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { OwnerService } from "src/app/owners/services/owner.service";
import { TruckService } from "src/app/owners/services/truck.service";
import { filter, map, switchMap, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import Owner from "src/app/owners/domain/owner";
import Truck from "src/app/owners/domain/truck";

@Component({
  selector: "app-owner-form",
  templateUrl: "./owner-form.component.html",
  styleUrls: ["./owner-form.component.scss"],
  providers: [TruckService]
})
export class OwnerFormComponent implements OnInit {
  ownerForm: FormGroup;
  validation: ValidationMessages = new ValidationMessages();

  // Camiones por propietario
  trucks: Truck[] = [];
  displayedColumns: string[] = ["name", "domain", "year", "actions"];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly ownerService: OwnerService,
    private readonly truckService: TruckService
  ) {
    this.ownerForm = fb.group({
      id: [null],
      firstName: ["", [Validators.required, Validators.minLength(1)]],
      lastName: ["", [Validators.required, Validators.minLength(1)]],
      cuil: ["", [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.email]],
      shovelCost: [0, Validators.min(0)],
      tripCost: [0, Validators.min(0)],
      slideShovel: [false]
    });

    this.ownerForm.get("slideShovel").valueChanges.subscribe(existShovel => {
      if (existShovel) {
        this.ownerForm.get("shovelCost").enable();
      } else {
        this.ownerForm.get("shovelCost").disable();
      }
    });
  }

  ngOnInit() {
    const action: Observable<Params> = this.activatedRoute.params;
    action
      .pipe(
        filter(data => data.id !== "new"),
        map(data => data.id),
        switchMap(id => this.ownerService.get(id))
      )
      .subscribe(owner => {
        this.ownerForm.patchValue(owner);
        this.truckService
          .findByOwner(this.ownerForm.get("id").value)
          .subscribe(t => (this.trucks = t));
        if (this.ownerForm.get("shovelCost").value > 0) {
          this.ownerForm.get("shovelCost").enable();
          this.ownerForm.get("slideShovel").setValue(true);
        } else {
          this.ownerForm.get("shovelCost").disable();
          this.ownerForm.get("slideShovel").setValue(false);
        }
      });
  }

  saveData() {
    let response: Observable<any>;
    const { slideShovel, ...data } = this.ownerForm.value;
    if (this.isEdition()) response = this.ownerService.update(new Owner(data));
    else response = this.ownerService.create(data);

    response.subscribe(() => this.goBack());
  }

  isEdition(): boolean {
    return this.ownerForm.get("id").value !== null;
  }

  goBack() {
    this.router.navigate(["home", "owners", "persons"]);
  }

  public gotoDetailTruck(truckId: number) {
    this.router.navigate(["home", "owners", "trucks", truckId]);
  }

  public createTruck() {
    this.router.navigate(["home", "owners", "trucks", "new"], {
      queryParams: { ownerId: this.ownerForm.get("id").value }
    });
  }
}
