import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import User from "../../../core/domain/security/user";
import {Conversation} from "../../domain/conversation";
import {of, Subject} from "rxjs";
import {UserService} from "../../../core/commons/service/user.service";
import {AuthService} from "../../../core/security/service/auth.service";
import {ProfileService} from "../../../user-profile/service/profile-service.service";
import {SnackbarService} from "../../../core/service/snackbar.service";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {ConversationService} from "../../service/conversation.service";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import moment from "moment";
import {ConfirmDialogService} from "../../../core/commons/service/confirm-dialog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit, OnDestroy {

  user: User = null;
  conversations: Conversation[] = [];
  @Output('conversationSelected')
  conversationOutput: EventEmitter<Conversation> = new EventEmitter();
  page = 0;
  pageSize = 10;
  public userList: User[] = [];
  public isSearch = false;
  searchControl: FormControl;

  constructor(private conversationService: ConversationService,
              private userService: UserService,
              private authService: AuthService,
              private profileService: ProfileService,
              private confirmationService: ConfirmDialogService,
              private appService: GlobalAppService,
              private snackbarService: SnackbarService
              // private cd: ChangeDetectorRef
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    this.conversationService.unsetSelectedConversation();
    this.conversationService.subscribeConversationList()
      .subscribe(c => {
        this.conversations = c;
        this.loadProfilePhotos();
        // this.cd.markForCheck();
      });
    this.conversationService.getConversationList();

    this.searchControl = new FormControl('');

    /*
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(),
        tap(term => this.isSearch = true),
        switchMap( term => {
          this.conversations = this.conversationService.filterConversations( term );
          this.loadProfilePhotos();
          if (term !== '') {
            return this.userService.findByValue(term)
              .pipe(map(users => users.filter(user => user.id !== this.authService.userValue.id)))
          }
          this.isSearch = false;
          return of([]);
        }),
        catchError(() => of([]))
        )
      .subscribe((u: User[]) => {
        this.userList = u;
        this.userList.forEach(user => {
          this.profileService.getProfilePhotoByUserId(user.id)
            .subscribe()
        })
        // this.cd.markForCheck();
      });

     */
  }

  ngOnDestroy() {
    this.conversationService.unsetSelectedConversation();
  }

  loadProfilePhotos() {
    /*
    this.conversations.forEach(c => {
      this.profileService.getProfilePhotoByUserId(c.participants[0].id)
        .subscribe();
    });

     */
  }

  public getConversation(c: Conversation) {
    c = new Conversation(c)
    this.conversationService.setSelectedConversation(c);
    this.conversationOutput.emit(c);
    // this.cd.markForCheck();
  }

  public getCreateTime(time: number): string {
    return moment(time, 'x').fromNow()
  }

  public createConversation( participant: User ): void {
    const c: Conversation = new Conversation();
    c.participants = [];
    c.participants.push(participant);
    c.participants.push(this.conversationService.user);
    c.groupConversation = false;
    c.createTime = new Date().getTime();
    this.conversationOutput.emit(c);
  }

  public deleteConversation(conversation: Conversation): void {
    this.confirmationService.showDialog({
      title: "Confirmar",
      message: "¿Está seguro que desea eliminar la conversación?",
      icon: "delete",
      onAccept: () => {
        this.appService.setLoading(true);
        this.conversationService.delete(conversation).subscribe(
          b => {
            this.appService.setLoading(false);
            this.applyFilter();
            this.snackbarService.show({
              title: "Eliminado",
              body: "Se ha eliminado la conversación",
              type: "success"
            });
          },
          (error: HttpErrorResponse) => {
            this.appService.setLoading(false);
            this.snackbarService.show({
              title: "Error",
              body: "No ha sido posible eliminar la conversación. " + error.message,
              type: "error"
            });
          }
        );
      },
    });
  }

  applyFilter() {
  }


}
