import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'add-event.html'
})
export class AddEvent{
    constructor(public viewCtrl: ViewController){

    }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}