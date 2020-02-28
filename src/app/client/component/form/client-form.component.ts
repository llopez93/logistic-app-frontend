import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationMessages} from "../../../core/service/validation-messages";
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {ClientService} from "../../service/client.service";
import {Client} from "../../domain/client";
import {PhoneType} from "../../domain/phone-type";

@Component({
  selector: 'app-form-list',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  validation: ValidationMessages = new ValidationMessages();
  phoneTypes: string[] = Object.values(PhoneType);

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly clientService: ClientService) {

    this.clientForm = fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(1)]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      phoneType: ["", [Validators.required]],
      email: [null, Validators.email],
    });
  }

  ngOnInit() {
    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.clientService.get(id))
    ).subscribe(user => {
      this.clientForm.patchValue(user);
    });
  }

  saveData() {
    let response: Observable<any>;
    if (this.isEdition())
      response = this.clientService.update(new Client(this.clientForm.value));
    else
      response = this.clientService.create(this.clientForm.value);

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
}
