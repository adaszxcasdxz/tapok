import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation, public firebaseService: FireBaseService, public viewCtrl: ViewController) {
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

  dismiss(){
    this.viewCtrl.dismiss();
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
        position: latLng,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
      var iconLink;
      for(i = 0; i < this.lat.length; i++){
        eventLocation[i] = new google.maps.LatLng(this.lat[i], this.long[i]);
        if(this.info[i].status != 'archive')
          this.addMarker(eventLocation[i], this.info[i], this.lat[i], iconLink);  
      }

    }, (err) => {
    });
    
  }

  addMarker(eventLocation, info, lat, iconLink){

     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: eventLocation,
       //icon: iconLink
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
      if(this.info[i].latitude == lat&&this.info[i].status != 'archive'){
        contentString = contentString.concat('<div id="'+this.info[i].$key+'"><h3 id="'+this.info[i].$key+'">'+this.info[i].name+'</h3><hr>'+this.info[i].date+'<br>'+this.info[i].time+'<hr>Attendees: '+this.info[i].tapok+'<br></div>');
        event[y] = this.info[i].$key;
        y++;
      }
    }

    let infoWindow = new google.maps.InfoWindow({
      content: '<div class="scrollFix">'+contentString+'</div>'
    });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          for(var i=0;i<event.length;i++){
            document.getElementById(event[i]).addEventListener('click', (ev) => {
              this.openTapokContent(ev.toElement.id);
            });
          }
        });
   });
  }

  openTapokContent(key){
    this.navCtrl.push('TapokContent', {param1: key});
  }
    
}
