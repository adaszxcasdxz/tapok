import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
//import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { App } from 'ionic-angular/components/app/app';
import { TabsPage } from '../tabs/tabs';
import { FireBaseService } from '../../providers/firebase-service';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { Badge } from '@ionic-native/badge';

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
 
  userData: any;
  displayName: any;
  email: any;
  photoURL: any;
  isLoggedIn: boolean = false; 
  inDB: boolean = false;
  usersdb: any;
  users: any[] = []; 
  userProfile: any = null;
  //userProfileRef: any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController,
    private facebook: Facebook, private platform: Platform, public app: App, 
    public firebaseService: FireBaseService, private gPlus: GooglePlus, public badge: Badge) { 
      this.usersdb = this.firebaseService.getUsersList();
      
      this.usersdb.subscribe(snapshot => { 
            var i = 0;
            snapshot.forEach(snap => {
                this.users[i] = snap;
                i++;
            })
        });

      firebase.auth().onAuthStateChanged(user => {
        if(user){
          console.log(user);
          this.userProfile = user;
        } else{
          console.log("No user");
        }
      })
  }


  loginWithGoogle(){
    this.gPlus.login({
      'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com',//for android&ios
      'client_id': '765761820847-e6ja4bvkmu7k04r2r47iekoimhagnv0c.apps.googleusercontent.com'//for &ios
    })
    .then(res => {      
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(success => {
            this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
            this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);

            for(var i = 0; i<this.users.length; i++){
            if(this.users[i].$key == this.afAuth.auth.currentUser.uid){
              this.inDB = true;
              break;
            }
          }

            this.userData={
              name:this.afAuth.auth.currentUser.displayName,
              photo:this.afAuth.auth.currentUser.photoURL,
              email:this.afAuth.auth.currentUser.email,
              age: "",
              name_search: (this.afAuth.auth.currentUser.displayName).toLowerCase()
            }

            if(!this.inDB){
              this.firebaseService.loginUser(this.userData); 
              this.navCtrl.setRoot('AddBirthdayPage');
              this.requestPermission();
              this.setBadges();
              this.getBadges();
              this.navCtrl.popToRoot();
            }
            else{
              this.requestPermission();
              this.setBadges();
              this.getBadges();
              this.navCtrl.setRoot('TabsPage');
            }
          }).catch(err => {
            alert("not authenticated "+JSON.stringify(err, Object.getOwnPropertyNames(err)));
          });
    })
    .catch(err => {
      alert("error "+JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
  }
    

  loginWithFacebook(): Promise<any> {
    return this.facebook.login(['email', 'public_profile'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {  
            this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
            this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);

            for(var i = 0; i<this.users.length; i++){
            if(this.users[i].$key == this.afAuth.auth.currentUser.uid){
              this.inDB = true;
              break;
            }
          }
            this.userData={
              name:this.afAuth.auth.currentUser.displayName,
              photo:this.afAuth.auth.currentUser.photoURL,
              email:this.afAuth.auth.currentUser.email,
              age: "",
              name_search: (this.afAuth.auth.currentUser.displayName).toLowerCase()
            }

            if(!this.inDB){
              this.firebaseService.loginUser(this.userData); 
              this.navCtrl.setRoot('AddBirthdayPage');
              this.requestPermission();
              this.setBadges();
              this.getBadges();
              this.navCtrl.popToRoot();
            }
            else{
              this.requestPermission();
              this.setBadges();
              this.getBadges();
              this.navCtrl.setRoot('TabsPage');
            }
          });
      }).catch((error) => { console.log(error) });
  }

  async getBadges(){
    try{
      let badgeAmount = await this.badge.get();
    }catch (e){
      alert(e);
    }
  }

  async setBadges(){
    try{
      let badge = await this.badge.set(Number(0));
    }catch(e){
      alert(e);
    }
  }

  async requestPermission(){
    try{
      let hasPermission = await this.badge.hasPermission();
      if(!hasPermission){
        let permission=await this.badge.registerPermission();
      }
    }catch(e){
      alert(e);
    }
  }
}