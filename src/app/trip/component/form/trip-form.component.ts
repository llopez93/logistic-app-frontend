import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../client/service/client.service";
import {TruckService} from "../../../owners/services/truck.service";
import {ProviderService} from "../../../provider/service/provider.service";
import {MaterialService} from "../../../provider/service/material.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";
import {filter, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
  providers: [ClientService, TruckService, ProviderService, MaterialService]
})
export class TripFormComponent implements OnInit {

  tripForm: FormGroup;

  // Select con buscador para Clientes
  clientsFilter: BehaviorSubject<SelectItem[]> = new BehaviorSubject(null);
  clients: SelectItem[] = [{label: 'Selecciona un cliente', value: null}];
  clientSearchControl: FormControl = new FormControl();

  // Select con buscador para Camiones
  truckFilter: BehaviorSubject<SelectItem[]> = new BehaviorSubject(null);
  trucks: SelectItem[] = [{label: 'Selecciona un camión', value: null}];
  truckSearchControl: FormControl = new FormControl();

  // Select con buscador para Proveedores
  providerFilter: BehaviorSubject<SelectItem[]> = new BehaviorSubject(null);
  providers: SelectItem[] = [{label: 'Selecciona un proveedor', value: null}];
  providerSearchControl: FormControl = new FormControl();

  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly clientService: ClientService,
              private readonly truckService: TruckService,
              private readonly providerService: ProviderService,
              private readonly materialService: MaterialService) {

    this.tripForm = this.fb.group({
      id: [null],
      client: [null, Validators.required],
      truck: [null, Validators.required],
      date: [new Date(), Validators.required],
      tripInfo: this.fb.group({
        material: this.fb.group({
          id: [null, Validators.required],
          name: [null, Validators.required],
          unit: [null, Validators.required]
        }),
        origin: [null, Validators.required],
        destination: ['', [Validators.required, Validators.minLength(1)]],
        price: ['', [Validators.required, Validators.min(1)]]
      })
    });

    this.tripForm.get("tripInfo").disable();
    this.tripForm.get("client").valueChanges.subscribe(() => this.enableTripForm());
    this.tripForm.get("truck").valueChanges.subscribe(() => this.enableTripForm());
    this.tripForm.get("tripInfo").get("origin").valueChanges.pipe(
      filter( value => value),
      switchMap(() => this.materialService.getByProvider(this.tripForm.get("tripInfo").get("origin").value))
    )
      .subscribe(materials => console.log(materials));
  }

  ngOnInit() {
    this.clientService.getAll()
      .subscribe(clients => {
        this.clients = this.clients.concat(clients.map(c => ({label: c.name + " | " + c.socialReason, value: c})));
        this.clientsFilter.next(this.clients);
      });

    this.clientSearchControl.valueChanges
      .subscribe(() => {
        this.selectFilter(this.clients, this.clientSearchControl.value, this.clientsFilter);
      });

    this.truckService.getAll()
      .subscribe(trucks => {
        this.trucks = this.trucks.concat(trucks.map(t => ({label: t.name + " | " + t.domain, value: t})));
        this.truckFilter.next(this.trucks);
      });

    this.truckSearchControl.valueChanges
      .subscribe(() => {
        this.selectFilter(this.trucks, this.truckSearchControl.value, this.truckFilter);
      });

    this.providerService.getAll()
      .subscribe(providers => {
        this.providers = this.providers.concat(providers.map(p => ({label: p.name + " | " + p.socialReason, value: p})));
        this.providerFilter.next(this.providers);
      });

    this.providerSearchControl.valueChanges
      .subscribe(() => {
        this.selectFilter(this.providers, this.providerSearchControl.value, this.providerFilter);
      });
  }

  isEdition(): boolean {
    return false;
  }

  selectFilter(array: SelectItem[], value: string, resultSubject: Subject<SelectItem[]>) {
    if (!value && !array) {
      resultSubject.next(array);
    } else {
      value = value.toLowerCase();
      resultSubject.next(
        array.filter(item => item.label.toLowerCase().indexOf(value) > -1)
      );
    }
  }

  enableTripForm() {
    if (this.tripForm.get("client").value && this.tripForm.get("truck").value)
      this.tripForm.get("tripInfo").enable();
    else
      this.tripForm.get("tripInfo").disable();

  }

}
