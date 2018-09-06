import { Component } from '@angular/core';

import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController,
  ToastController, NavParams } from 'ionic-angular';


import { Journal } from '../../model/journal';
import { JournalListService } from '../../services/journal-list.service';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {

  
  entry: Journal = {
    title: 'Default',
    content: '',
    date: ''
  };

  public loading: Loading;
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private journalListService: JournalListService, public alertCtrl: AlertController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEntryPage');
  }

  showSaveAlert(entry){

    let alert = this.alertCtrl.create({
      title: 'Save Entry',
      message: 'Enter the title of the journal entry below:',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          
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
          text: 'Save',
          handler: data => {
            this.entry.title= data.title;
            this.getDate();
            this.journalListService.addJournal(this.entry).
            then(ref => {
              this.loading.dismiss().then( () => {
                this.navCtrl.setRoot(HomePage);
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

  getDate(){
    var dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth();
    var date = dateObj.getDate();

    var monthArray = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    this.entry.date = year + '-' + monthArray[month] + '-' + date;
  }

}
