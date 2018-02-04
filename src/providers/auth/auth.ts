import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from "rxjs/Observable";
import firebase from 'firebase/app'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public googlePlus:GooglePlus) {
    console.log('Hello AuthProvider Provider');
  }

  googleLogin(){
    console.log("pls")
    return Observable.create(observer => {
      return this.googlePlus.login({
        'webClientId': '765761820847-odrnbes28kqoqsiml6s1rc77g0ci38v5.apps.googleusercontent.com',
        'offline': true
      })
      .then( res => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(firecreds)
        .then( success => { observer.next(success); })
        .catch(error => {
          observer.error(error);
        });
      });
    })
  }
 //authResponse.accessToken
  logout(){
    firebase.auth().signOut().then(function() {
      alert("logout successful");
    }, function(error) {
      console.log(error);
    });
  }
}
