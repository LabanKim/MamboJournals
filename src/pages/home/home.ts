import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Journal } from '../../model/journal';
import { JournalListService } from '../../services/journal-list.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { NewEntryPage } from '../new-entry/new-entry';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journalListRef$: any;
  currentUser: firebase.User;
  private userId: string;

  private dateArray: Array<string>;

  constructor(public navCtrl: NavController, private database: AngularFireDatabase, private auth: AngularFireAuth ) {

    auth.authState.subscribe(user => {
      this.currentUser = user;
      
      if (this.currentUser) {
          this.userId = this.currentUser.uid;
          
        }

        this.dateArray = ["One"];
        
  });
    
  }

  ionViewDidLoad() {

    this.journalListRef$ = this.database.list('journalList/' + this.userId).valueChanges();

    for (const entry of this.journalListRef$) {
      
      //this.dateArray = [entry.date];
      console.log(entry);

    }

  }
  

  newEntry(){
    //this.navCtrl.push(NewEntryPage);

    for (const date of this.dateArray) {

      console.log(date);
      
    }
  }

}
