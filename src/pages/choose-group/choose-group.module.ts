import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseGroupPage } from './choose-group';

@NgModule({
  declarations: [
    ChooseGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseGroupPage),
  ],
})
export class ChooseGroupPageModule {}
