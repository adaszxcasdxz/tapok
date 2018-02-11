import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBirthdayPage } from './add-birthday';

@NgModule({
  declarations: [
    AddBirthdayPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBirthdayPage),
  ],
})
export class AddBirthdayPageModule {}
