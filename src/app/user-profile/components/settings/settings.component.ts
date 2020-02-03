import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserPreferences} from "../../domain/user-preferences";
import {NotificationTopic} from "../../../notifications/domain/notification-topic";
import {ProfileService} from "../../service/profile-service.service";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {SnackbarService} from "../../../core/service/snackbar.service";
import {NotificationTopicService} from "../../../notifications/service/notification-topic.service";
import {UserService} from "../../../core/commons/service/user.service";
import {Router} from "@angular/router";

const minPasswordLength = 6;


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading: boolean = true;
  preferences: UserPreferences;
  topics: NotificationTopic[];
  topicsSelected = [];
  passwordFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private snackbarService: SnackbarService,
              private topicService: NotificationTopicService,
              private userService: UserService,
              private router: Router) {

    this.passwordFormGroup = fb.group({
      old: ['', [Validators.required]],
      newPass: ['', [Validators.required, Validators.min(minPasswordLength)]],
      repeatNewPass: ['', [Validators.required, Validators.min(minPasswordLength)]],
    }, {validators: this.checkPasswords })

  }


  ngOnInit() {


    this.topicService.getAll().subscribe(t => {
      this.topics = t;
      this.profileService.getUserPreferences().subscribe(p => {
        this.preferences = p;
        this.topics.forEach(topic => {
          if(p.suscribedTopics.find(suscribedTopic => suscribedTopic.id === topic.id)){
            this.topicsSelected.push(true);
          } else {
            this.topicsSelected.push(false);
          }
        });
        this.loading = false;
      })
    });



  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPass').value;
    let confirmPass = group.get('repeatNewPass').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(event: any) {

    const topicsToSubmit: NotificationTopic[] = [];
    for (let index = 0; index < this.topicsSelected.length; index++) {
      if (this.topicsSelected[index]) {
        topicsToSubmit.push(this.topics[index])
      }
    }


    this.preferences.suscribedTopics = topicsToSubmit;

    this.profileService.updateUserPreferences(this.preferences).subscribe(res => {
      this.snackbarService.show({
        type: "success",
        title: "Éxito",
        body: "Se ha guardado la configuración exitosamente"
      });    }, err => {
      this.snackbarService.show({
        type: "error",
        title: "Error",
        body: "Ha ocurrido un error al guardar la configuración"
      });
    });



    event.preventDefault();
  }

  shouldShowPasswordsDontMatch(): boolean{
    const newPass = this.passwordFormGroup.get('newPass').value;
    const repeat = this.passwordFormGroup.get('repeatNewPass').value;

    return (newPass.length > 0 && repeat.length > 0 && newPass != repeat)
  }

  onUpdatePassword(){
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
          body: "Ha ocurrido un error al intentar cambiar su contraseña"
        })
      );

  }

}

