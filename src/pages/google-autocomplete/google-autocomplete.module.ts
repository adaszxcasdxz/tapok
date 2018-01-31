import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleAutocompletePage } from './google-autocomplete';

@NgModule({
  declarations: [
    GoogleAutocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleAutocompletePage),
  ],
})
export class GoogleAutocompletePageModule {}
