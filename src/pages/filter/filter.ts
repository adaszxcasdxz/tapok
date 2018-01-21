import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'filter.html'
})
export class Filter{

    popOver: any;

    constructor(public viewCtrl: ViewController){

    }

}