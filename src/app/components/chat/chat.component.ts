import { Component, Input, OnInit } from '@angular/core';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { ChatMessageInterface, ChatMessagePostInterface } from '../../models/general.models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {filter} from "rxjs/operators";
import {getUser} from "../../store/user/user.selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() inputMode: 'message' | 'reportIssue' = 'message';
  @Input() quoteId: string = null;
  @Input() enableIssueMode = false;
  messageToSend;
  issueTitle;
  issueMessage;
  busy = false;
  user;
  messages: Array<ChatMessageInterface> = [];
  defaultAvatar = 'assets/img/chat-outgoing-avatar.svg';
  engineerDefaultAvatar = 'assets/img/avatar-white.svg';

  constructor(
    private quoteAPIService: QuoteAPIService,
    private store: Store,
    private notification: NzNotificationService,
  ) {
    this.store.select(getUser)
        .pipe(filter(d => d !== null))
        .subscribe(userProfile => {
          this.user = userProfile;
        });
  }

  ngOnInit(): void {
    if (this.quoteId === null) {
      throw Error('quoteId not provided.');
    }
    this.loadMessages(this.quoteId);
  }

  loadMessages(quoteId: string) {
    this.busy = true;
    this.quoteAPIService.listMessages(quoteId).subscribe(
      response => {
        this.messages = response;
        this.busy = false;
      },
      errorResponse => {
        this.notification.error('Error loading messages message', 'Please try again later, or contact support');
        this.busy = false;
      }
    );
  }

  sendMessage() {
    this.busy = true;
    const messageObj: ChatMessagePostInterface = {
      title: 'message',
      text: this.messageToSend,
      returnedQuote: this.quoteId,
    };
    this.quoteAPIService.postChatMessage(messageObj).subscribe(
      response => {
        this.messageToSend = null;
        this.messages = [...this.messages, response];
        this.busy = false;
      },
      errorResponse => {
        this.notification.error('Error sending message', 'Please try again later, or contact support');
        this.busy = false;
      }
    );

  }

  submitIssue() {

  }

}
