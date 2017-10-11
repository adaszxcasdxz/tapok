import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTapok } from './add-tapok';

@NgModule({
  declarations: [
    AddTapok,
  ],
  imports: [
    IonicPageModule.forChild(AddTapok),
  ],
  exports: [
    AddTapok
  ]
})
export class AddTapokModule {}
