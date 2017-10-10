import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { KuyogContent } from '../kuyog-content/kuyog-content';
import { Filter } from '../filter/filter';
import { AddKuyog } from '../add-kuyog/add-kuyog';
import { FireBaseService } from '../../providers/firebase-service'; // m 
import { FirebaseListObservable } from 'angularfire2/database'; // mao ni

@Component({
  selector: 'page-kuyog',
  templateUrl: 'kuyog.html'
})
export class KuyogPage {

  Event: FirebaseListObservable<any[]>; // m
  pages: string = "list"; 
  public toggled = false;

  constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, 
      public modalCtrl: ModalController, public firebaseService: FireBaseService) {
    this.toggled = false;
    this.Event = this.firebaseService.getEvent(); // m
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }
  
  openKuyogContent(event){
    this.navCtrl.push(KuyogContent, {param1: event});
  }

  showFilterPopOver(myKuyog){
    let popover = this.popoverCtrl.create(Filter);
    popover.present({
      ev: myKuyog
    });
  }

  openAddKuyog(){
    let modal = this.modalCtrl.create(AddKuyog);
    modal.present();
  }

}

