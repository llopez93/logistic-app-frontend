import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule, MatTooltipModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import {MessageService} from "./service/message.service";
import {ConversationService} from "./service/conversation.service";
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory, StompConfig, StompService} from "@stomp/ng2-stompjs";
import {FiscaliaStompConfig} from "../core/configuration/stomp.config";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppCommonsModule} from "../core/commons/commons.module";


@NgModule({
  declarations: [ChatComponent, ConversationListComponent, MessageBoxComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  providers: [MessageService, ConversationService,
    {
      provide: StompConfig,
      useValue: FiscaliaStompConfig
    },
    StompService]
})
export class ChatModule { }
