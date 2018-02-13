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
        eventLocation[i] = new google.maps.LatLng(this.lat[i], this.long[i]);
        this.addMarker(eventLocation[i], this.info[i], this.lat[i]);
      }

    }, (err) => {
      console.log(err);
    });
    
  }

  addMarker(eventLocation, info, lat){

     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: eventLocation
     });
    
     let content = info;         
    
     this.addInfoWindow(marker, content, lat);
    
   }

   addInfoWindow(marker, content, lat){

    //var contentString = '<div id="tap"><h3>'+content.name+'</h3><hr>'+content.date+'<br>'+content.time+'<hr>Attendees: '+content.tapok+'<br></div>';
    var contentString = '';
    var event: any[] = [];
    var y = 0;

    for(var i=0;i<this.info.length;i++){
      if(this.info[i].latitude == lat){
        contentString = contentString.concat('<div id="'+this.info[i].$key+'"><h3>'+this.info[i].name+'</h3><hr>'+this.info[i].date+'<br>'+this.info[i].time+'<hr>Attendees: '+this.info[i].tapok+'<br></div>');
        event[y] = this.info[i].$key;
        y++;
      }
    }

    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          for(var i=0;i<event.length;i++){
            document.getElementById(event[i]).addEventListener('click', (ev) => {
              this.openTapokContent(ev.toElement.id);
              console.log(ev.toElement.id);
            });
            console.log(event[i].length);
          }
        });
   });
  }

  openTapokContent(key){
    this.navCtrl.push('TapokContent', {param1: key});
  }
    
}
