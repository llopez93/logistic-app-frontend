import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Observable} from "rxjs";
import {ValidationMessages} from "../../../core/service/validation-messages";
import {filter, map, switchMap} from "rxjs/operators";
import {RoleService} from "../../service/role.service";
import {Role} from "../../../core/domain/security/role";
import User from "../../../core/domain/security/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  validation: ValidationMessages = new ValidationMessages();
  rolesAsync: Observable<Role[]>;

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly userService: UserService,
              private readonly roleService: RoleService) {

    this.userForm = fb.group({
      id: [null],
      firstName: ["", [Validators.required, Validators.minLength(1)]],
      lastName: ["", [Validators.required, Validators.minLength(1)]],
      email: ["", [Validators.required, Validators.email]],
      role: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.rolesAsync = this.roleService.getAll();
    const action: Observable<Params> = this.activatedRoute.params;
    action.pipe(
      filter(data => data.id !== "new"),
      map(data => data.id),
      switchMap(id => this.userService.get(id))
    ).subscribe(user => {
      this.userForm.patchValue(user);
      console.log(this.userForm);
    });
  }

  saveData() {
    let response: Observable<any>;
    if (this.isEdition())
      response = this.userService.update(new User(this.userForm.value));
    else
      response = this.userService.create(this.userForm.value);

    response.subscribe(response =>
      this.router.navigate(["home", "administration", "users"])
    );


  }

  isEdition(): boolean {
    return this.userForm.get("id").value !== null;
  }

  compareRole(role1: Role, role2: Role): boolean {
    return role1.compareTo(role2);
  }

  goBack() {
    this.router.navigate(["home", "administration", "users"]);
  }

}
