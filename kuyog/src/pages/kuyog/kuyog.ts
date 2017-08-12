import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { KuyogContent } from '../kuyog-content/kuyog-content';
import { Filter } from '../filter/filter';
import { AddKuyog } from '../add-kuyog/add-kuyog';
import { FireBaseService } from '../../providers/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-kuyog',
  templateUrl: 'kuyog.html'
})
export class KuyogPage {

  Event: FirebaseListObservable<any[]>;
  pages: string = "list";
  public toggled = false;

  constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, 
      public modalCtrl: ModalController, public firebaseService: FireBaseService) {
    this.toggled = false;
    this.Event = this.firebaseService.getEvent();
  }

  toggleSearch(){
    this.toggled = this.toggled ? false : true;
  }
  
  openKuyogContent(){
    this.navCtrl.push(KuyogContent, {});
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

