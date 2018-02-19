import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPersonPage } from './add-person';

@NgModule({
  declarations: [
    AddPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPersonPage),
  ],
})
export class AddPersonPageModule {}
