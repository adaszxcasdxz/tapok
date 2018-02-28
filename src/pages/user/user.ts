import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { App } from 'ionic-angular/components/app/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

declare var google;

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentLocation: any;
  pages: any = "me";
  username: any;
  email: any;
  photo: any;
  otherUser: any;
  Following: any;
  Follower: any;
  History: any;
  check: any = false;
  followInfo: any;
  lat: any = 0;
  lng: any = 0;
  permission: any;
  followKey: any;
  other: any = false;
  removeFollowerSubscribe: any;
  removeFollowingSubscribe: any;
  Archive: any[] = [];

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App, 
    public angularFireAuth: AngularFireAuth, public params: NavParams, public viewCtrl: ViewController, 
    public modalCtrl: ModalController, public geolocation: Geolocation, private facebook: Facebook,
    private gPlus: GooglePlus) {
    this.otherUser = this.params.get('otherUser');
    this.Following = this.firebaseService.getFollowing();
    this.Follower = this.firebaseService.getAllFollowers();
    this.History = this.firebaseService.getHistory();
    this.firebaseService.getEvent().subscribe(snapshot => {
      var i = 0;
      snapshot.forEach(snap => {
        if(snap.status == 'archive'){
          for(var attendees in snap.attendees){
            //console.log();
            if(snap.attendees[attendees].name == this.firebaseService.getUser()){
              this.Archive[i] = snap;
              i++;
            }
          } 
        }
      });
    });
    this.pages = 'me';

    console.log(this.permission);
    if(this.otherUser != null){ 
      console.log(this.otherUser.name);
      this.Following.subscribe(snapshot => {
        snapshot.forEach(snap => {
          if(snap.name == this.otherUser.name){
            this.check = true;
            this.followKey = snap.$key;
          }
        });
      });
    }

    if(this.otherUser == null){
      this.username = this.angularFireAuth.auth.currentUser.displayName;
      this.email = this.firebaseService.getEmail();
      //this.email = 'this.firebaseService.getEmail()';
      this.photo = this.firebaseService.getPhotoURL();
      //this.photo = 'this.firebaseService.getPhotoURL()';
    }else{
      this.username = this.otherUser.name;
      this.email = this.otherUser.email;
      this.photo = this.otherUser.photo;
      this.other = true;
    }
  }

  ionViewWillEnter(){
    this.firebaseService.getPermission(this.username).subscribe(snapshot => {
      if(snapshot.length == 0)
        this.permission = false;
      else  
        this.permission = true;
    });
      this.firebaseService.getUserLocation(this.username).subscribe(snap => {
        if(snap!=undefined){
          this.lat = snap[0].$value;
          this.lng = snap[1].$value;
        }
      if(this.permission)
        this.loadMap();
    });
  }

  loadMap(){
    var i, eventLocation: any[] = [];
      this.geolocation.getCurrentPosition().then((position) => {
        
        let latLng = new google.maps.LatLng(this.lat, this.lng);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        this.currentLocation = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

      }, (err) => {
        console.log(err);
      });
    
  }

  changePage(val){
    this.pages = val;
    console.log(this.pages);
    if(val == 'me')
      this.ionViewWillEnter();
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

    var follower = {
      'name': this.firebaseService.getUser(),
      //this.email = this.firebaseService.getEmail();
      'email': 'this.firebaseService.getEmail()',
      //this.photo = this.firebaseService.getPhotoURL();
      'photo': 'this.firebaseService.getPhotoURL()'
    }

    this.firebaseService.addFollowing(follow, follower);
  }

  followOther(fol){
    var follow = {
      'name': fol.name,
      'email': fol.email,
      'photo': fol.photo
    }

    var follower = {
      'name': this.firebaseService.getUser(),
      //this.email = this.firebaseService.getEmail();
      'email': this.firebaseService.getEmail(),
      //this.photo = this.firebaseService.getPhotoURL();
      'photo': this.firebaseService.getPhotoURL()
    }

    this.firebaseService.addFollowing(follow, follower);
  }

  unfollow(follow){
    var name = this.firebaseService.getUser();
    if(this.otherUser == null){
      this.firebaseService.removeFollowing(follow.$key);
    }else{
      this.removeFollowingSubscribe = this.firebaseService.getFollowing().subscribe(snapshot => {
        snapshot.forEach(snap => {
          if(snap.name == follow.name)
          this.firebaseService.removeFollowing(snap.$key);
        });
      });
      
    }
    this.removeFollowerSubscribe = this.firebaseService.getFollowers(follow.name).subscribe(snapshot => {
        snapshot.forEach(snap => {
          if(snap.name == name){
            console.log(follow.name + '' +snap.$key);
            this.firebaseService.removeFollower(follow.name, snap.$key);
          }
        })
      });
    this.check = false;
  }

  askPermission(){
    if(this.permission)
      this.firebaseService.allowPermission();
    else
      this.firebaseService.removePermission();

    this.ionViewWillEnter();
    console.log(this.permission);
    console.log('this.permission');
  }

  openUser(user){
    let modal = this.modalCtrl.create('UserPage', { otherUser: user });
    modal.present();
  }

  dismiss() {
    if(this.removeFollowerSubscribe != undefined)
      this.removeFollowerSubscribe.unsubscribe();
    if(this.removeFollowingSubscribe != undefined)
      this.removeFollowingSubscribe.unsubscribe();
		this.viewCtrl.dismiss();
	}
}
