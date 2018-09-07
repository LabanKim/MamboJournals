import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Journal } from '../../model/journal';

import { EditEntryPage } from '../edit-entry/edit-entry';

@IonicPage()
@Component({
  selector: 'page-view-entry',
  templateUrl: 'view-entry.html',
})
export class ViewEntryPage {

  entry: Journal = {
    title: '',
    content: '',
    date: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEntryPage');

    this.entry = this.navParams.get('entry');
  }

  loadEditEntry(entry){
    this.navCtrl.push(EditEntryPage, {entry});
  }

}
