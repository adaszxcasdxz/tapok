import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TapokPage } from './tapok';

@NgModule({
  declarations: [
    TapokPage,
  ],
  imports: [
    IonicPageModule.forChild(TapokPage),
  ],
  exports: [
    TapokPage
  ]
})
export class TapokPageModule {}
