import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { LoginGooglePage } from '../login-google/login-google';
import { App } from 'ionic-angular/components/app/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';

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
  History: any;
  check: any = false;
  followKey: any;
  lat: any = 0;
  lng: any = 0;
  permission: any;

  constructor(public navCtrl: NavController, public firebaseService: FireBaseService, public app: App, public angularFireAuth: AngularFireAuth, public params: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public geolocation: Geolocation) {
    this.otherUser = this.params.get('otherUser');
    this.Following = this.firebaseService.getFollowing();
    this.History = this.firebaseService.getHistory();
    this.pages = 'me';

    console.log(this.permission);
    if(this.otherUser != null){
      console.log(this.otherUser.name);
      this.Following.subscribe(snapshot => {
        snapshot.forEach(snap => {
          if(snap.name = this.otherUser.name){
            this.check = true;
            this.followKey = snap.$key;
          }
        });
      });
    };

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

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    if(this.otherUser==null){
      this.firebaseService.getPermission(this.username).subscribe(snapshot => {
        if(snapshot.length == 0)
          this.permission = false;
        else  
          this.permission = true;
      });
      this.firebaseService.getUserLocation(this.username).subscribe(snap => {
        this.lat = snap[0].$value;
        this.lng = snap[1].$value;
      }); 
      if(this.permission)
        this.loadMap();
    }
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

    this.firebaseService.addFollowing(follow);
  }

  unfollow(){
    this.firebaseService.removeFollowing(this.followKey);
    this.check = false;
    this.followKey = null;
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

  dismiss() {
		this.viewCtrl.dismiss();
	}
}
