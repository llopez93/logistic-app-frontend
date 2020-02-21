import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationMessages} from "../../../core/service/validation-messages";
import {Observable} from "rxjs";
import {Role} from "../../../core/domain/security/role";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoleService} from "../../service/role.service";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  roleForm: FormGroup;
  validation: ValidationMessages = new ValidationMessages();

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly roleService: RoleService) {

    this.roleForm = fb.group({
      id: [null],
      name: ["", [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.roleService.get(id))
    ).subscribe(r => {
      this.roleForm.patchValue(r);
    });
  }

  saveData() {
    let response: Observable<any>;
    if (this.isEdition())
      response = this.roleService.update(new Role(this.roleForm.value));
    else
      response = this.roleService.create(this.roleForm.value);

    response.subscribe(() =>
      this.goBack()
    );


  }

  isEdition(): boolean {
    return this.roleForm.get("id").value !== null;
  }

  goBack() {
    this.router.navigate(["home", "administration", "roles"]);
  }

}
