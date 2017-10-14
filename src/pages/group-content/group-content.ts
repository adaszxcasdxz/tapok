import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'group-content.html'
})
export class GroupContent {

  groupcont: string = "posts";

  constructor(public navCtrl: NavController){

  }

}