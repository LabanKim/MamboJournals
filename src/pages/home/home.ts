import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Journal } from '../../model/journal';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { NewEntryPage } from '../new-entry/new-entry';
import { ViewEntryPage } from '../view-entry/view-entry';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journalListRef$: any;
  currentUser: firebase.User;
  private userId: string;

  constructor(public navCtrl: NavController, private database: AngularFireDatabase, private auth: AngularFireAuth ) {

    auth.authState.subscribe(user => {
      this.currentUser = user;
      
      if (this.currentUser) {
          this.userId = this.currentUser.uid;
          
        }
        
  });
    
  }

  ionViewDidLoad() {

    this.journalListRef$ = this.database.list('journalList/' + this.userId).valueChanges();

  }
  

  newEntry(){
    this.navCtrl.push(NewEntryPage);
  }

  itemSelected(entry: Journal){
    this.navCtrl.push(ViewEntryPage, {entry});
    console.log(entry.key);
  }

}
