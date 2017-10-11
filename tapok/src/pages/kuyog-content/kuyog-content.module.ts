import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KuyogContent } from './kuyog-content';

@NgModule({
  declarations: [
    KuyogContent,
  ],
  imports: [
    IonicPageModule.forChild(KuyogContent),
  ],
  exports: [
    KuyogContent
  ]
})
export class KuyogContentModule {}
