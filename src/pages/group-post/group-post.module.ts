import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupPost } from './group-post';

@NgModule({
  declarations: [
    GroupPost,
  ],
  imports: [
    IonicPageModule.forChild(GroupPost),
  ],
  exports: [
    GroupPost
  ]
})
export class GroupContentModule {}