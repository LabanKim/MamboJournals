import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Journal } from '../../model/journal';

import { JournalListService } from '../../services/journal-list.service'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { text } from '@angular/core/src/render3/instructions';

@IonicPage()
@Component({
  selector: 'page-edit-entry',
  templateUrl: 'edit-entry.html',
})
export class EditEntryPage {

  entry: Journal = {
    title: '',
    content: '',
    date: ''
  };

  journalListRef$: any;
  currentUser: firebase.User;
  private userId: string;

  public loading: Loading;

  constructor(
    private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private database: AngularFireDatabase, private auth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private journalListService: JournalListService) {

    this.entry = this.navParams.get('entry');

    console.log( 'Entry ID' + this.entry.key);

  }

  ionViewDidLoad() {

    this.journalListRef$ = this.database.list('journalList/' + this.userId);

  }


  updateEntry(entry: Journal){

    let alert = this.alertCtrl.create({
      title: 'Update Entry',
      message: 'Enter the title of the journal entry below:',
      inputs: [
        {
          name: 'title',
          placeholder: entry.title
          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            this.journalListService.updateJournal(entry).
            then(ref => {
              this.loading.dismiss().then( () => {
                this.navCtrl.pop();
              });
              
            })

            this.loading = this.loadingCtrl.create();
            this.loading.present();
          }

        }
      ]
    });
    alert.present();

  }

}
