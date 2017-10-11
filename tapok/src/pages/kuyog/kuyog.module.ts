import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KuyogPage } from './kuyog';

@NgModule({
  declarations: [
    KuyogPage,
  ],
  imports: [
    IonicPageModule.forChild(KuyogPage),
  ],
  exports: [
    KuyogPage
  ]
})
export class KuyogPageModule {}
