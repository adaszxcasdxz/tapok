import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;
/**
 * Generated class for the GoogleAutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-google-autocomplete',
  templateUrl: 'google-autocomplete.html',
})
export class GoogleAutocompletePage {

  @ViewChild('autocomplete') autocompleteElement: ElementRef;
  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any;
  map: any;
  places: any;
  infoWindow: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.autocompleteItems = [];
    let latLng = new google.maps.LatLng(0 , 0);
  }

  ionViewDidLoad() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteElement.nativeElement);
  }

}
