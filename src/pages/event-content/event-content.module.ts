import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventContent } from './event-content';

@NgModule({
  declarations: [
    EventContent,
  ],
  imports: [
    IonicPageModule.forChild(EventContent),
  ],
  exports: [
    EventContent
  ]
})
export class EventContentModule {}
