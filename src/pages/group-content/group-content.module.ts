import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupContent } from './group-content';

@NgModule({
  declarations: [
    GroupContent,
  ],
  imports: [
    IonicPageModule.forChild(GroupContent),
  ],
  exports: [
    GroupContent
  ]
})
export class SearchPageModule {}
