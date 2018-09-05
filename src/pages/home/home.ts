import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { Journal } from '../../model/journal';
import { JournalListService } from '../../services/journal-list.service';

import { NewEntryPage } from '../new-entry/new-entry';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journalList: Observable<Journal[]>
 
  constructor(public navCtrl: NavController, private journalListService: JournalListService) {
    this.journalList = this.journalListService.getJournalList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  newEntry(){
    this.navCtrl.push(NewEntryPage);
  }

}
