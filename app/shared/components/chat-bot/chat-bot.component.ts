import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { scan } from 'rxjs/operators';
import {ChatService, Message} from '../../ApiServices/chat.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  status = false;
  messages: Observable<Message[]>;
  formValue: string;
  constructor(public chat: ChatService) { }
  ngOnInit() {
    this.messages = this.chat.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val) ));
  }
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '' ;
  }
}
