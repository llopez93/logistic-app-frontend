import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/security/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ValidationMessages} from "../../core/service/validation-messages";
import {ConfirmDialogService} from "../../core/commons/service/confirm-dialog.service";
import {ConfirmDialogData} from "../../core/commons/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [AuthService]
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  validation : ValidationMessages = new ValidationMessages();

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder,
              private cd: ChangeDetectorRef) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigate(['home']);
    setTimeout(this.cd.markForCheck, 2000);
  }

  public login(event) {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(
        success => {
          this.router.navigate(['home']);
        },
        err => {
          //this.pushMsg(MessageSeverity.ERROR, 'Intento de ingreso fallido', 'Usuario o contraseña incorrecta.');
          console.log("login invalido");
        });
  }


  public goToRegister() {
    this.router.navigate(['register']);
  }

}
