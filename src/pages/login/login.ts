import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
//import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { App } from 'ionic-angular/components/app/app';
import { TabsPage } from '../tabs/tabs';
import { FireBaseService } from '../../providers/firebase-service';
import firebase from 'firebase';

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
    private facebook: Facebook, private platform: Platform, public app: App, public firebaseService: FireBaseService) { 
      this.usersdb = this.firebaseService.getUsersList();
      
      this.usersdb.subscribe(snapshot => { //
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

  loginWithGoogle():void{
    console.log(this.afAuth.auth.currentUser);
    const provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    this.afAuth.auth.signInWithPopup(provider)
    /*firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then (result=>{
        var token = result.credential.accessToken;
        var user = result.user;
      })  */
    
    //})
    .then((result) => {
        var token = result.credential.accessToken;
      
        var user = result.user;
      //console.log(result.user);
      //console.log(result.user.displayName); 
      //console.log("Success");

      this.firebaseService.setUser(this.afAuth.auth.currentUser.displayName);
      this.firebaseService.setUID(this.afAuth.auth.currentUser.uid);
      for(var i = 0; i<this.users.length; i++){
        if(this.users[i].$key == this.afAuth.auth.currentUser.uid){
          this.inDB = true;
          break;
        }
      }
        
      //this.navCtrl.setRoot('TabsPage');
      
      this.userData={
        status:"logged in",
        name: this.afAuth.auth.currentUser.displayName,
        photo: this.afAuth.auth.currentUser.photoURL,
        email: this.afAuth.auth.currentUser.email,
        age: ""
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
    })
  }

  loginWithFacebook(): Promise<any> {
    return this.facebook.login(['email', 'public_profile'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            //alert("successfully logged in");
            alert("Firebase success: " + JSON.stringify(success) + JSON.stringify(success.user_birthday)); 
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
              age: ""
              //bday:this.afAuth.auth.currentUser.user_birthday
            }
            //this.firebaseService.loginUser(this.userData);

            if(!this.inDB){
              this.firebaseService.loginUser(this.userData); 
              this.navCtrl.setRoot('AddBirthdayPage');
              this.navCtrl.popToRoot();
            }
            else{
              this.navCtrl.setRoot('TabsPage');
            }
          });
      }).catch((error) => { console.log(error) });
  }
}