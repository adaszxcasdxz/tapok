import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { App } from 'ionic-angular/components/app/app';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  }
  userData: any;
  userProfileRef: any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController,
    private facebook: Facebook, private platform: Platform, public app: App) {
      
  }

  loginFacebook() {
    //this.navCtrl.push(TabsPage);

    /*if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
      //this.navCtrl.push(TabsPage);
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }*/
    //this.navCtrl.push(TabsPage);

    /*this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      });
    });*/

    //sign in to facebook
    this.facebook.login(['email', 'public_profile']).then((result=>{
      let credentials = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken) //'credential'
      return firebase.auth().signInWithCredential(credentials);
    })).then((user)=>{
      this.userProfileRef.child(firebase.auth().currentUser.uid).set({
        id:firebase.auth().currentUser.uid,
        email: user.email,
        displayName:user.displayName,
        profilePictureURL:user.photoURL
      });
      this.navCtrl.setRoot(TabsPage);
      console.log("success");
    }).catch((error)=>{
      alert(error);
    })
  }
}
