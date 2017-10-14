import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TapokContent } from './tapok-content';

@NgModule({
  declarations: [
    TapokContent,
  ],
  imports: [
    IonicPageModule.forChild(TapokContent),
  ],
  exports: [
    TapokContent
  ]
})
export class TapokContentModule {}
