import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { LoginGooglePage } from '../login-google/login-google';
import { App } from 'ionic-angular/components/app/app';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  pages: string = "me";
  username: any;
  email: any;
  photo: any;
  otherUser: any;
  Followers: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App, public angularFireAuth: AngularFireAuth, public params: NavParams, public viewCtrl: ViewController) {
    this.otherUser = this.params.get('otherUser');
    this.Followers = this.firebaseService.getFollowers();

    if(this.otherUser == null){
      this.username = this.firebaseService.getUser();
      //this.email = this.firebaseService.getEmail();
      this.email = 'this.firebaseService.getEmail()';
      //this.photo = this.firebaseService.getPhotoURL();
      this.photo = 'this.firebaseService.getPhotoURL()';
    }else{
      this.username = this.otherUser.name;
      this.email = this.otherUser.email;
      this.photo = this.otherUser.photo;
    }
  }

  logout(){
    this.angularFireAuth.auth.signOut(); 
    this.app.getRootNav().setRoot('LoginPage');
  }

  follow(){
    var follow = {
      'name': this.username,
      'email': this.email,
      'photo': this.photo
    }

    this.firebaseService.addFollowers(follow);
  }

  unfollow(key){
    this.firebaseService.removeFollowers(key);
  }

  dismiss() {
		this.viewCtrl.dismiss();
	}
}
