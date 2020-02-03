import { Component, OnInit } from '@angular/core';
import {ConversationService} from "../../service/conversation.service";
import {Conversation} from "../../domain/conversation";
import {AuthService} from "../../../core/security/service/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  loading = false;
  conversation: Conversation = null;

  constructor(private conversationService: ConversationService, private authService: AuthService) {}

  ngOnInit() {
    this.conversationService.unsetSelectedConversation();
    this.authService.user.subscribe(u => {
      this.conversationService.setUserAndConversations(u);
    })
  }

  public showConversation(c: Conversation) {
    this.conversation = c;
  }

}
