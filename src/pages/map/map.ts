import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FireBaseService } from '../../providers/firebase-service';
import { FirebaseApp } from 'angularfire2/app';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  Event: any;
  lat: any[] = [];
  long: any[] = [];
  info: any[] = []; 
  currentLocation: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation, public firebaseService: FireBaseService) {
    var y;

    this.Event = this.firebaseService.getEvent();

    this.Event.subscribe(snapshots => {
      this.lat.length = 0;
      this.long.length = 0;
      y = 0;
      snapshots.forEach(snapshot => {
        this.lat[y] = snapshot.latitude;
        this.long[y] = snapshot.longitude;
        this.info[y] = snapshot;
        y++;
      })
    });
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap(){
    var i, eventLocation: any[] = [];
    this.geolocation.getCurrentPosition().then((position) => {
      
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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

      for(i = 0; i < this.lat.length; i++){
        console.log(this.lat[i]);
        eventLocation[i] = new google.maps.LatLng(this.lat[i], this.long[i]);
        /*let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: eventLocation[i]
        });*/
        this.addMarker(eventLocation[i], this.info[i]);
      }

    }, (err) => {
      console.log(err);
    });
    
  }

  addMarker(eventLocation, info){
    
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: eventLocation
     });
    
     let content = info.name;         
    
     this.addInfoWindow(marker, content);
    
   }

   addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }
    
}
