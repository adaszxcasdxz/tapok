import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'group-content.html'
})
export class GroupContent {

  groupcont: string = "posts";

  constructor(public navCtrl: NavController){

  }

}