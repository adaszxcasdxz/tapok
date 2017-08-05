import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController } from 'ionic-angular';
import { KuyogContent } from '../kuyog-content/kuyog-content';
import { Filter } from '../filter/filter';
import { AddKuyog } from '../add-kuyog/add-kuyog';

@Component({
  selector: 'page-kuyog',
  templateUrl: 'kuyog.html'
})
export class KuyogPage {

  pages: string = "list";
  public toggled = false;

  constructor(
      public navCtrl: NavController, public popoverCtrl: PopoverController, 
      public modalCtrl: ModalController) {
    this.toggled = false;
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

