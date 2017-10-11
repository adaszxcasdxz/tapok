import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddKuyog } from './add-kuyog';

@NgModule({
  declarations: [
    AddKuyog,
  ],
  imports: [
    IonicPageModule.forChild(AddKuyog),
  ],
  exports: [
    AddKuyog
  ]
})
export class AddKuyogModule {}
