import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController } from 'ionic-angular';
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
  History: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App, public angularFireAuth: AngularFireAuth, public params: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.otherUser = this.params.get('otherUser');
    this.Followers = this.firebaseService.getFollowing();
    this.History = this.firebaseService.getHistory();

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

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }
  
  openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
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

    this.firebaseService.addFollowing(follow);
  }

  unfollow(key){
    this.firebaseService.removeFollowing(key);
  }

  dismiss() {
		this.viewCtrl.dismiss();
	}
}
