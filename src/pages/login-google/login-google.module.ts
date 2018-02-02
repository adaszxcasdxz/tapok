import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginGooglePage } from './login-google';

@NgModule({
  declarations: [
    LoginGooglePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginGooglePage),
  ],
})
export class LoginGooglePageModule {}
