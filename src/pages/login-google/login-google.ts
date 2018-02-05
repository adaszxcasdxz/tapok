import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { FireBaseService } from '../../providers/firebase-service';
import { AngularFireModule } from 'angularfire2';
///import { AppModule } from '../../app/app.module';
import googlePlusApi from '../../app/app.module';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the LoginGooglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-google',
  templateUrl: 'login-google.html',
  //providers: [GooglePlus]
})



export class LoginGooglePage {
  displayName: any;
  email: any;
  photoURL: any;
  isLoggedIn: boolean = false;
  //userProfile: any = null; 

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public navParams: NavParams, public angularFireAuth: AngularFireAuth, public authProvider: AuthProvider) {
    /*AngularFireModule.initializeApp({
    apiKey: "AIzaSyDn-6txbosz7KRe6_rFZ8Lwj3Obh63JEik"
    });*/
    /*firebase.auth().onAuthStateChanged( function(user){
      if(user){
        this.userProfile = user;
      }
      else{
        this.userProfile = null;
      }
    });*/
  }

  loginWithGoogle(){
    console.log(this.angularFireAuth.auth.currentUser);
    var provider = new firebase.auth.GoogleAuthProvider();
    
    this.angularFireAuth.auth.signInWithPopup(provider)
    .then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(result.user);
      console.log(result.user.displayName); 
      console.log("Success");
      alert("Logged In Successfully!");

      this.firebaseService.setUser(this.angularFireAuth.auth.currentUser.displayName);
      this.firebaseService.setUID(this.angularFireAuth.auth.currentUser.uid);
      this.navCtrl.setRoot('TabsPage');
      this.navCtrl.popToRoot();
      this.userData={
        status:"logged in",
        name: this.angularFireAuth.auth.currentUser.displayName,
        photo: this.angularFireAuth.auth.currentUser.photoURL,
        email: this.angularFireAuth.auth.currentUser.email
      }
      this.firebaseService.loginUser(this.userData);
    }).catch(function(error){
      var errorCode = error.code;
      console.log(errorCode); 
    })
  }
  

  /*loginWithGoogle(){
    alert("hey");
    this.googlePlus.login({
      'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com',
      'offline': true
    }).then(res=>{
      alert("Success");
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(success=>{
        alert("Logged in successfully!");
      }).catch(err=>{
        alert("Not successful");
      })
    })
  }*/

  /*loginWithGoogle(): Promise<any> {
    //return this.googlePlus.login(['email'])
    return this.googlePlus.login({
        'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com',
        'offline': true
      })
    .then( response => {
      console.log("mama mary pls help me");
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.authResponse.accessToken);

      firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
      .then( success => {
        alert("Successfully Logged In!");
        this.navCtrl.setRoot('TabsPage')
      });
    }).catch((error) => { console.log(error) });
  }  */

  /*loginWithGoogle(): void{
    console.log(this.authProvider.googleLogin());
    this.authProvider.googleLogin().subscribe((res) => {
      console.log("sulod");
      this.email = res.email;
      this.displayName = res.displayName;
      this.photoURL = res.photoURL;
      this.isLoggedIn = true;
      //this.navCtrl.push('TabsPage');
      //this.navCtrl.setRoot('TabsPage');
    }, err =>{
      console.log(err);
    });
  }

  logout(){
    this.authProvider.logout();
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginGooglePage');
  }

}
