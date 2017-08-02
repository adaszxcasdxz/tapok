import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})
export class GroupPage{
    group: string="mygroup";
    constructor(public navCtrl: NavController){

    }

}