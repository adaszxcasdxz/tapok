import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverChatPage } from './popover-chat';

@NgModule({
  declarations: [
    PopoverChatPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverChatPage),
  ],
})
export class PopoverChatPageModule {}
