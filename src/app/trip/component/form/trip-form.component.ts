import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../client/service/client.service";
import {TruckService} from "../../../owners/services/truck.service";
import {ProviderService} from "../../../provider/service/provider.service";
import {MaterialService} from "../../../provider/service/material.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";
import {filter, switchMap} from "rxjs/operators";
import {Material} from "../../../domain/material";
import {ValidationMessages} from "../../../core/service/validation-messages";
import {Trip} from "../../../domain/trip";
import Truck from "../../../owners/domain/truck";
import {Client} from 'src/app/client/domain/client';
import {TripService} from "../../service/trip.service";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {ConfirmDialogService} from "../../../core/commons/service/confirm-dialog.service";
import {SnackbarService} from "../../../core/service/snackbar.service";
import {MaterialPrice} from "../../../domain/material-price";

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
  providers: [ClientService, TruckService, ProviderService, MaterialService]
})
export class TripFormComponent implements OnInit, AfterViewInit {

  tripForm: FormGroup;
  readonly validation: ValidationMessages = new ValidationMessages();

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

  materials: MaterialPrice[] = [];
  materialsChangeEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly fb: FormBuilder,
              private readonly appService: GlobalAppService,
              private readonly confirmationService: ConfirmDialogService,
              private readonly snackbarService: SnackbarService,
              private readonly route: ActivatedRoute,
              private readonly clientService: ClientService,
              private readonly truckService: TruckService,
              private readonly providerService: ProviderService,
              private readonly materialService: MaterialService,
              private readonly tripService: TripService) {

    this.tripForm = this.fb.group({
      id: [null],
      client: [null, Validators.required],
      truck: [null, Validators.required],
      date: [new Date(), Validators.required],
      tripInfo: this.fb.group({
        materialPrice: ['', Validators.required],
        material: this.fb.group({
          id: [null, Validators.required],
          name: ['', Validators.required],
          unit: ['', Validators.required],
        }),
        origin: [null, Validators.required],
        destination: ['', [Validators.required, Validators.minLength(1)]],
        manualOriginCharge: [false],
        originName: ['', [Validators.required, Validators.minLength(1)]],
        loadSize: ['', [Validators.required, Validators.min(1), this.validation.isNumber()]],
        price: [0, [Validators.required, this.validation.isNumber()]],
        loadCost: [false],
        fuel: [0, [Validators.required, this.validation.isNumber()]],
        lapCount: [1]
      })
    });
    this.tripForm.get("tripInfo").disable();
    this.tripForm.get("client").valueChanges.subscribe(() => this.enableTripForm());
    this.tripForm.get("truck").valueChanges.subscribe(() => this.enableTripForm());

    this.tripForm.get("tripInfo").get("origin").valueChanges.pipe(
      filter(value => value),
      switchMap(() =>
        this.materialService.getPricesByProvider(this.tripForm.get("tripInfo").get("origin").value)))
      .subscribe(materials => {
        console.log(materials);
        this.tripForm.get("tripInfo").get("material").reset();
        if (materials.length > 0) {
          this.materials = materials;
          this.materialsChangeEvent.next(true);
          this.tripForm.get("tripInfo").get("material").enable();
        } else {
          this.materials = [];
          this.tripForm.get("tripInfo").get("material").disable();
        }
      });

    this.materialsChangeEvent.asObservable()
      .pipe(
        filter(event => event === true)
      )
      .subscribe(() => {
        this.tripForm.get("tripInfo").get("material").patchValue(this.materials[0].material);
        this.tripForm.get("tripInfo").get("materialPrice").patchValue(this.materials[0].price);
      });

    this.tripForm.get("tripInfo").get("manualOriginCharge").valueChanges
      .subscribe(manualLoad => {
        if (manualLoad) {
          this.tripForm.get("tripInfo").get("origin").disable();
          this.tripForm.get("tripInfo").get("originName").enable();
          this.materialService.getAll().subscribe(res => {

            this.tripForm.get("tripInfo").get("material").enable();
            this.materials = res.map(m => new MaterialPrice({price: 0, material: m}));
            this.materialsChangeEvent.next(true);
          });
        } else {
          this.materials = [];
          this.tripForm.get("tripInfo").get("material").reset();
          this.tripForm.get("tripInfo").get("material").disable();
          this.tripForm.get("tripInfo").get("origin").enable();
          this.tripForm.get("tripInfo").get("originName").disable();
        }
      });


  }

  ngOnInit() {
    this.appService.setLoading(true);

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

  ngAfterViewInit(): void {
    this.appService.setLoading(false);
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
    if (this.tripForm.get("client").value && this.tripForm.get("truck").value) {
      this.tripForm.get("tripInfo").enable();
      this.tripForm.get("tripInfo").get("originName").disable();
    } else
      this.tripForm.get("tripInfo").disable();

  }

  setMaterial(materialName: string) {
    const m: MaterialPrice = this.materials.filter(val => val.material.name === materialName).pop();
    this.tripForm.get("tripInfo").get("material").patchValue(m.material);
    this.tripForm.get("tripInfo").get("materialPrice").patchValue(m.price);
  }

  getLapCount(): number {
    return this.tripForm.get("tripInfo").get("lapCount").value;
  }

  enableRemoveBtn(): boolean {
    return this.tripForm.get("tripInfo").get("lapCount").value > 1;
  }

  addLap() {
    this.tripForm.get("tripInfo").get("lapCount").patchValue(
      this.tripForm.get("tripInfo").get("lapCount").value + 1
    );

  }

  removeLap() {
    this.tripForm.get("tripInfo").get("lapCount").patchValue(
      this.tripForm.get("tripInfo").get("lapCount").value - 1
    );
  }

  formValid(): boolean {
    return this.tripForm.get("tripInfo").valid
      && this.tripForm.get("tripInfo").enabled
      && this.tripForm.get("tripInfo").get("material").enabled
      && this.tripForm.valid;
  }

  saveData() {
    const client: Client = new Client(this.tripForm.get("client").value);
    const truck: Truck = new Truck(this.tripForm.get("truck").value);
    const tripDate: Date = this.tripForm.get("date").value;
    const laps: number = this.tripForm.get("tripInfo").get("lapCount").value;

    const {manualOriginCharge, lapCount, ...tripData} = this.tripForm.get("tripInfo").value;
    const trip: Trip = new Trip(tripData);
    trip.client = client;
    trip.truck = truck;
    trip.tripDate = tripDate;

    this.confirmationService.showDialog({
      title: "Atención",
      message: "¿Está seguro que registrar el/los viaje/s?",
      icon: "warning",
      onAccept: () => {
        this.appService.setLoading(true);
        this.tripService.createTrip(trip, laps).subscribe(value => {
          console.log("Refrescar el listado");
          this.snackbarService.show({
            type: "success",
            title: "Operación exitosa",
            body: "La información fue registrada correctamente.",
            duration: 1000
          });
        });
      }
    }, 400).subscribe(value => this.appService.setLoading(false));
  }

  providerWithoutMaterials(): boolean {
    return this.tripForm.get("tripInfo").get("origin").enabled
      && this.tripForm.get("tripInfo").get("origin").valid
      && this.materials.length === 0;
  }

}
