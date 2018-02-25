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
    /*console.log(this.afAuth.auth.currentUser);
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');*/

    /*firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result){
      if(result.credential){
        var token = result.credential.accessToken;
      }
      var user = result.user*/
    //})
    /*this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;
 
      console.log(result.user);
      console.log(result.user.displayName);
      //console.log("Success");
      //alert("Logged In Successfully!");

      this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
      this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);
      for(var i = 0; i<this.users.length; i++){
        if(this.users[i].$key == this.afAuth.auth.currentUser.uid){
          this.inDB = true;
          break;
        }
      }
        
      this.navCtrl.setRoot('TabsPage');
      
      this.userData={
        status:"logged in",
        name: this.afAuth.auth.currentUser.displayName,
        photo: this.afAuth.auth.currentUser.photoURL,
        email: this.afAuth.auth.currentUser.email,
        age: "",
        name_search: (this.afAuth.auth.currentUser.displayName).toLowerCase()
      }
      
      if(!this.inDB){
        this.firebaseService.loginUser(this.userData); 
        this.navCtrl.setRoot('AddBirthdayPage');
        this.navCtrl.popToRoot();
      }
      else{
        this.navCtrl.setRoot('TabsPage');
      }
          
    }).catch(function(error){
      var errorCode = error.code;
      console.log(errorCode); 
    })*/
  this.gPlus.login({
      'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com'
    })
    .then(res => {
      //const googleCredential = firebase.auth.GoogleAuthProvider
        //.credential(res.accessToken);
      
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(success => {
            //alert(this.afAuth.auth.currentUser.displayName);
            this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
            this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);
            //alert("firebase authentication");

            for(var i = 0; i<this.users.length; i++){
            if(this.users[i].$key == this.afAuth.auth.currentUser.uid){
              this.inDB = true;
              break;
            }
          }

            //this.navCtrl.setRoot('TabsPage');
            //this.navCtrl.setRoot('AddBirthdayPage');
            this.userData={
              status:"logged in",
              name:this.afAuth.auth.currentUser.displayName,
              photo:this.afAuth.auth.currentUser.photoURL,
              email:this.afAuth.auth.currentUser.email,
              age: "",
              name_search: (this.afAuth.auth.currentUser.displayName).toLowerCase()
              //bday:this.afAuth.auth.currentUser.user_birthday
            }
            //alert("logged in");
            //this.firebaseService.loginUser(this.userData);

            if(!this.inDB){
              this.firebaseService.loginUser(this.userData); 
              this.navCtrl.setRoot('AddBirthdayPage');
              this.requestPermission();
              this.setBadges();
              this.getBadges();
              this.navCtrl.popToRoot();
              //alert("not in DB");
            }
            else{
              this.requestPermission();
              this.setBadges();
              this.getBadges();
              this.navCtrl.setRoot('TabsPage');
              //alert("in DB");
            }
          }).catch(err => {
            //alert("not authenticated "+JSON.stringify(err, Object.getOwnPropertyNames(err)));
          });
    //console.log(res);
    //alert("success "+JSON.stringify(res));
    })
    .catch(err => {
    //console.error(err);
    alert("error "+JSON.stringify(err, Object.getOwnPropertyNames(err)));
    });
  }
    

  loginWithFacebook(): Promise<any> {
    return this.facebook.login(['email', 'public_profile'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            //alert("successfully logged in");
            //alert("Firebase success: " + JSON.stringify(success) + JSON.stringify(success.user_birthday)); 
            this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
            this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);

            for(var i = 0; i<this.users.length; i++){
            if(this.users[i].$key == this.afAuth.auth.currentUser.uid){
              this.inDB = true;
              break;
            }
          }

            //this.navCtrl.setRoot('TabsPage');
            //this.navCtrl.setRoot('AddBirthdayPage');
            this.userData={
              status:"logged in",
              name:this.afAuth.auth.currentUser.displayName,
              photo:this.afAuth.auth.currentUser.photoURL,
              email:this.afAuth.auth.currentUser.email,
              age: "",
              name_search: (this.afAuth.auth.currentUser.displayName).toLowerCase()
              //bday:this.afAuth.auth.currentUser.user_birthday
            }
            //this.firebaseService.loginUser(this.userData);

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
      alert("got the badges @ login");
    }catch (e){
      alert(e);
    }
  }

  async setBadges(){
    try{
      let badge = await this.badge.set(Number(0));
      alert("set the badges @ login");
    }catch(e){
      alert(e);
    }
  }

  async requestPermission(){
    try{
      let hasPermission = await this.badge.hasPermission();
      if(!hasPermission){
        let permission=await this.badge.registerPermission();
        alert("permission registered @ login");
      }
      alert("has permission @ login");
    }catch(e){
      alert(e);
    }
  }
}