import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatContent } from './chat-content';

@NgModule({
  declarations: [
    ChatContent,
  ],
  imports: [
    IonicPageModule.forChild(ChatContent),
  ],
  exports: [
    ChatContent
  ]
})
export class ChatContentModule {}
