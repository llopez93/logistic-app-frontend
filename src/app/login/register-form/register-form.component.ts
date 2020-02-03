import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/security/service/auth.service";
import {MinistryService} from "../../user-profile/service/ministry.service";
import {UserRequestService} from "../../core/service/user-request.service";
import {GlobalAppService} from "../../core/commons/service/global-app.service";
import {UserRequest} from "../../core/domain/user-request";
import {ValidationMessages} from "../../core/service/validation-messages";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [AuthService, MinistryService, UserRequestService]
})
export class RegisterFormComponent implements OnInit {

  mensajes: string[] = [];
  registerForm: FormGroup;
  ministries: SelectItem[] = [{label: 'Selecciona un area de trabajo', value: null}];
  requestSaved: boolean = false;
  showWorkplaceInput: boolean = false;

  ministriesFilter : BehaviorSubject<SelectItem[]> = new BehaviorSubject(null);
  ministrieSearchControl: FormControl = new FormControl();

  validation : ValidationMessages = new ValidationMessages();

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userRequestService: UserRequestService,
              private appService: GlobalAppService,
              private ministryService: MinistryService) {

    this.registerForm = fb.group({
      "firstname": ["", [ Validators.required, Validators.minLength(1) ]  ],
      "lastname": ["", [ Validators.required , Validators.minLength(1) ] ],
      "dni": ["", [ Validators.required, Validators.minLength(7), this.validation.isNumber() ] ],
      "email": ["", [ Validators.required, Validators.email ]     ],
      "phone" : ["", [ Validators.required, Validators.minLength(8) ] ],
      "ministry" : [null, Validators.required],
      "workplace" : ['']
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigate(["home"]);
    else {
      this.ministryService.publicFindAll().subscribe(ministries => {
        this.ministries = this.ministries.concat(
          ministries.map(ministry => ({label: ministry.name, value: ministry})));
        this.ministries.push({label: "Otro", value: "otro"});
        this.ministriesFilter.next(this.ministries);
      });
    }

    this.registerForm.get("ministry").valueChanges
      .subscribe( ministry => {
        if  (ministry && (ministry.toString() == "otro") ) {
          this.showWorkplaceInput = true;
          this.registerForm.get("workplace").reset();
          this.registerForm.get("workplace").enable();
          this.registerForm.get("workplace").setValidators(Validators.required);
        } else {
          this.showWorkplaceInput = false;
          this.registerForm.get("workplace").disable();
          this.registerForm.get("workplace").clearValidators();
        }
      });

  this.ministrieSearchControl.valueChanges
      .subscribe(() => {
        this.filterMinistries();
      });
  }


  public registerUser( { value, valid } ){
    if (valid){
      console.log(value);
      this.appService.setLoading(true);

      if (value.ministry == "otro"){
        value.ministry = null;
      }

      let userRequest = new UserRequest(value);
      userRequest.createTime = new Date().getTime();
      userRequest.username = userRequest.email;

      /**
      this.userRequestService.checkEmail(userRequest.email)
        .subscribe(
          users =>{
            this.checkDni(userRequest);

          },
          error =>{
            this.appService.setLoading(false);
            this.pushMsg(MessageSeverity.ERROR, "Error", error);
          }

        );
       */
    }
  }

  public checkDni(userRequest){
    //
    // this.userRequestService.checkDni(userRequest.dni)
    //   .subscribe(
    //     users => {
    //       this.userRequestService.create(userRequest).subscribe( userReq => {
    //         this.requestSaved = true;
    //         this.appService.setLoading(false);
    //       });
    //     },
    //     error =>{
    //       this.appService.setLoading(false);
    //       this.pushMsg(MessageSeverity.ERROR, "Error", error);
    //     }
    //   )
  }

  public filterMinistries(){
    if (!this.ministries) {
      return;
    }
    // get the search keyword
    let search = this.ministrieSearchControl.value;
    if (!search) {
      this.ministriesFilter.next(this.ministries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.ministriesFilter.next(
      this.ministries.filter(m => m.label.toLowerCase().indexOf(search) > -1)
    );
  }

}

