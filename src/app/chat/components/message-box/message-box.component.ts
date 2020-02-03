import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Conversation} from "../../domain/conversation";
import User from "../../../core/domain/security/user";
import {Message} from "../../domain/message";
import {Subject} from "rxjs";
import {ConversationService} from "../../service/conversation.service";
import {UserService} from "../../../core/commons/service/user.service";
import {StompService} from "@stomp/ng2-stompjs";
import moment from "moment";
import {filter, map, switchMap} from "rxjs/operators";
import {AttachedFile} from "../../domain/attached-file";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {


  public _conversation: Conversation = null;
  public user: User = null;
  public msgList: Message[] = [];
  public msgText = '';
  public userList: User[] = [];
  public userSearch: Subject<string> = new Subject();
  public conversationSocket = null;
  public socketConnected = false;
  public photo = new Subject<string>();
  public attachedFileString: String;
  public chatBox;
  public fetchingData = false;
  public currentPage = 0;
  public addedMsg = false;
  public endOfChat = false;
  loading = true;
  participants: string;
  constructor(private conversationService: ConversationService,
              private userService: UserService,
              private stompService: StompService,
              private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.chatBox = document.querySelector('.msg-list');
    setInterval(() => {
      this.onScroll();
    }, 500);

  }

  @Input('conversation')
  set conversation(c: Conversation) {
    this.user = this.conversationService.user;
    this._conversation = c;
    this.loading = true;
    this.currentPage = 0;
    this.msgList = [];
    this.closeConnection();
    this.endOfChat = false;
    this.fetchingData = true;
    if (this._conversation.id) {
      this.getParticipants();
      this.conversationService.getLatestMessages(this._conversation).subscribe(msgs => {
        this.loading = false;
        this.msgList = msgs.reverse();
        this.connect(this._conversation.id);
        this.cd.detectChanges();
        this.chatBox = document.querySelector('.msg-list');
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
        this.fetchingData = false;
      });
    }

    // this.cd.markForCheck();
  }

  onScroll() {
    if (!this.endOfChat && !this.fetchingData && this.chatBox.scrollTop === 0) {
      this.fetchingData = true;
      this.currentPage++;
      const oldHeigth = this.chatBox.scrollHeight;
      this.cd.detectChanges();
      this.conversationService.getMessagesPage(this._conversation, this.currentPage).subscribe(msgs => {
        this.endOfChat = msgs.length === 0;
        this.msgList = msgs.reverse().concat(this.msgList);
        this.cd.detectChanges();
        this.chatBox.scrollTop += (this.chatBox.scrollHeight - oldHeigth);
        setTimeout(() => {
          this.fetchingData = false;
        }, 1000);
      });
    }
  }

  public getAttached(m: Message){
    if(m.attachedFile.extension == 'pdf'){
      this.conversationService.downloadPDF(m.id)
        .subscribe(res => {
          const fileURL = URL.createObjectURL(res);
          const downloadLink = document.createElement('a');
          downloadLink.href = fileURL;
          downloadLink.download = m.attachedFile.name;
          downloadLink.click();
        });
    }else{
      this.conversationService.downloadImage(m.id)
        .subscribe(res => {
          const fileURL = URL.createObjectURL(res);
          const downloadLink = document.createElement('a');
          downloadLink.href = fileURL;
          downloadLink.download = m.attachedFile.name;
          downloadLink.click();
        });
    }
  }


  public shouldHaveTime(index: number): boolean {
    return index === 0 || ( this.msgList[index].user.id !== this.msgList[index - 1].user.id ||
      this.getMsgTime(this.msgList[index].createTime) !==
      this.getMsgTime(this.msgList[index - 1].createTime) );
  }

  public getMsgTime(time: number): string {
    const createTime = moment(time);
    const days = createTime.diff(new Date(), 'days');
    if (days > -2) {
      return createTime.fromNow();
    }
    return createTime.format('L');
  }

  public getParticipants(): void {
    let participants = '';
    if (this._conversation.groupConversation) {
      this._conversation.participants.forEach(p => {
        if (p.id === this._conversation.participants[this._conversation.participants.length - 1].id) {
          participants = participants + p.firstname + ' ' + p.lastname;
        }
        participants = participants + p.firstname + ' ' + p.lastname + ', ';
      });
    }
    participants = this._conversation.participants[0].firstname + ' ' + this._conversation.participants[0].lastname;
    this.photo.next(this._conversation.participants[0].profilePhoto);
    this.participants = participants;
  }

  private pushMsj(msg: Message){
    this.addedMsg = true;
    this.msgList.push(msg);
    // Sin el setTimeOut, el scroll hasta el fondo se queda un poquito arriba.
    setTimeout(() => {
      this.chatBox = document.querySelector('.msg-list');
      this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }, 0);
    setTimeout(() => {
      this.addedMsg = false;
    }, 50)

  }

  public sendMsg(): void {
    if (this.msgText !== '') {
      const msg = new Message();
      msg.conversation = this._conversation;
      msg.user = this.user;
      msg.content = this.msgText;
      msg.readed = false;
      this.msgText = '';
      if (this._conversation.id) {
        this.conversationService.sendMessage(msg).subscribe(m =>this.pushMsj(m));
        //this.pushMsj(msg);
      } else {
        this.conversationService.create(this._conversation).pipe(
          switchMap( conversation => {
            this._conversation.id = conversation.id;
            this.connect(this._conversation.id);
            return this.conversationService.sendMessage(msg);
          })
        ).subscribe(m => this.pushMsj(m));

        // this.cd.markForCheck();
      }
    }
  }

  public connect( conversationId: number ){
    this.conversationSocket = this.stompService.subscribe('/chat/' + conversationId)
      .pipe(map( m => new Message( JSON.parse( m.body ) )), filter(m => m.user.id != this.user.id))
      .subscribe(m => {
        this.conversationService.messageService.changeMessageState( m.id, true);
        (<Message>m).readed = true;
        const shouldScroll = (this.chatBox.scrollHeight - this.chatBox.scrollTop) < this.chatBox.scrollHeight * 0.25 + 1000 ;
        this.msgList.push(m);
        this.addedMsg = true;
        setTimeout(() => {
          this.addedMsg = false;
          if(shouldScroll){
            this.chatBox.scrollTop = this.chatBox.scrollHeight;
          }
        }, 50)

        // this.cd.markForCheck();
      } );
    this.socketConnected = true;
  }

  public closeConnection(): void {
    if ( this.socketConnected ) {
      this.conversationSocket.unsubscribe();
      this.conversationSocket = null;
    }
    this.socketConnected = false;
  }

  seleccionFile( archivo: File ){
    if(!archivo){
      this.attachedFileString = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    reader.onload = e => { // called once readAsDataURL is completed
      this.attachedFileString = reader.result.toString();

      //creo el msj a enviar con el file.
      const msg = new Message();
      msg.conversation = this._conversation;
      msg.user = this.user;
      msg.content = this.msgText;
      msg.readed = false;

      //consigo los datos de attached
      const data = this.attachedFileString.split(",")[1];
      const contentType = this.attachedFileString.split(",")[0];
      const extensionGral = this.attachedFileString.split(";")[0];
      const extension = extensionGral.split("/")[1];
      const name = archivo.name;
      const size = archivo.size;

      //creo el attached.
      const attached = new AttachedFile();
      attached.data = data;
      attached.extension = extension;
      attached.contentType = contentType;
      attached.name = name;
      attached.size = size;

      msg.attachedFile = attached;

      if (this._conversation.id) {
        this.conversationService.sendMessage(msg).subscribe(m => this.pushMsj(m));
      } else {
        this.conversationService.create(this._conversation)
          .pipe(switchMap( conversation => {
            this._conversation.id = conversation.id;
            this.connect(this._conversation.id);
            return this.conversationService.sendMessage(msg);
          }))
          .subscribe(m =>  this.pushMsj(m));

      }
    }
  }

}
