import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the AttendeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendees',
  templateUrl: 'attendees.html',
})
export class AttendeesPage {

  key: any;
  Attendees: any;
  user: any;
  mainAdmin: any;
  Event: any;
  value: any;
  userKey: any;
  User: any;
  access: any;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FireBaseService) {
    this.key = this.navParams.get('key');
    this.user = this.firebaseService.getUser();
    //this.Attendees = this.firebaseService.getAttendees(this.key);
    this.Event = this.firebaseService.getSpecificEvent(this.key);
    this.User = this.firebaseService.getUsers();

    this.Attendees.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(this.user == snap.name && (snap.privelage == 'main_admin' || snap.privelage == 'admin')){
          this.access = 'ok'; 
        }
      })
    });

    this.User.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(snap.key == this.key){
          this.userKey = snap.$key; 
        }
      })
    });

    this.Event.subscribe(snapshot => {
      this.value = snapshot.tapok;    
    });

    this.Attendees.subscribe(snapshot => {
      snapshot.forEach(snap => {
        if(snap.privelage == 'main_admin'){
          this.mainAdmin = snap.name; 
        }
      })
    });
  }

  addAdmin(attendeeKey){
    this.firebaseService.addAdmin(this.key, attendeeKey);
  }

  removeAdmin(attendeeKey){
    this.firebaseService.removeAdmin(this.key, attendeeKey);
  }

  kickAttendee(attendeeKey){
    this.firebaseService.kickAttendee(this.key, attendeeKey, this.userKey,this.value-1);
  }

  test(test){
    console.log(test);
  }

}
