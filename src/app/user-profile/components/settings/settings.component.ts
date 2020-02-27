import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SnackbarService} from "../../../core/service/snackbar.service";
import {UserService} from "../../../core/commons/service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/security/service/auth.service";
import {ValidationMessages} from "../../../core/service/validation-messages";

const minPasswordLength = 6;


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading = true;
  passwordFormGroup: FormGroup;
  changeDefaultPassword = false;
  validation: ValidationMessages = new ValidationMessages();

  constructor(private readonly fb: FormBuilder,
              private readonly snackbarService: SnackbarService,
              private readonly userService: UserService,
              private readonly authService: AuthService,
              private readonly router: Router) {

    this.passwordFormGroup = fb.group({
      old: ['', [Validators.required]],
      newPass: ['', [Validators.required, Validators.minLength(minPasswordLength)]],
      repeatNewPass: ['', [Validators.required, Validators.minLength(minPasswordLength)]],
    }, {validators: this.checkPasswords});

  }


  ngOnInit() {
    this.authService.user.subscribe(u => {
      this.changeDefaultPassword = u.firstLogin;
      if (this.changeDefaultPassword)
        this.passwordFormGroup.get("old").disable();
      this.loading = false;
    });

  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPass').value;
    let confirmPass = group.get('repeatNewPass').value;

    return pass === confirmPass ? null : {notSame: true};
  }

  shouldShowPasswordsDontMatch(): boolean {
    const newPass = this.passwordFormGroup.get('newPass').value;
    const repeat = this.passwordFormGroup.get('repeatNewPass').value;

    return (newPass.length > 0 && repeat.length > 0 && newPass != repeat);
  }

  onUpdatePassword() {
    const newPass = this.passwordFormGroup.get('newPass').value;
    const oldPass = this.passwordFormGroup.get('old').value;

    this.userService.changePass(oldPass, newPass)
      .subscribe(
        res => {
          this.snackbarService.show({
            type: "success",
            title: "Éxito",
            body: "Se ha cambiado la contraseña exitosamente"
          });
          this.router.navigate(['home']);
        },
        err => this.snackbarService.show({
          type: "error",
          title: "Error",
          body: err
        })
      );

  }

}

