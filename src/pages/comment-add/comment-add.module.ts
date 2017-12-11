import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentAddPage } from './comment-add';

@NgModule({
  declarations: [
    CommentAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentAddPage),
  ],
})
export class CommentAddPageModule {}
