import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTapokPage } from './add-tapok';

@NgModule({
  declarations: [
    AddTapokPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTapokPage),
  ],
})
export class AddTapokPageModule {}
