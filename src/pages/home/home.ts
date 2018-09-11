import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Loading, LoadingController  } from 'ionic-angular';


import { Journal } from '../../model/journal';
import { JournalListService } from '../../services/journal-list.service';

import { NewEntryPage } from '../new-entry/new-entry';
import { ViewEntryPage } from '../view-entry/view-entry';
import { Observable } from 'rxjs/Observable';
import { PictureUtils } from '../../services/pictureUtils.service';
import { EditEntryPage } from '../edit-entry/edit-entry';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journalListRef$: Observable<Journal[]>;
  public loading: Loading;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private pictureUtils: PictureUtils,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private journalListService: JournalListService,
    private toastCtrl: ToastController) {

  }

  ionViewWillLoad() {

      this.loading = this.loadingCtrl.create({
        content: 'Loading entries...',
        spinner: 'bubbles'
      });
      this.loading.present();

      this.journalListRef$ = this.journalListService.getJournalList()
              .snapshotChanges().map( changes => {
                
              this.loading.dismiss();
              return changes.map( c => ({
                  key: c.payload.key, 
                  ...c.payload.val(),
              }));
          })
  }
  

  newEntry(){
    this.navCtrl.push(NewEntryPage);
  }

  viewSelected(entry: Journal){
    this.navCtrl.push(ViewEntryPage, {entry});
    console.log(entry.key);
  }

  loadEditEntry(entry){
    this.navCtrl.push(EditEntryPage, {entry});
  }

  deleteEntry(entry: Journal){
    this.journalListService.removeJournal(entry). then( () => {
      this.presentToast(entry.title);
    });
  }

  choosePicture(entry: Journal): void {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.pictureUtils.takePhoto(entry);
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.pictureUtils.loadFromGallery(entry);
          }
        }
      ]
    });
    actionSheet.present();
  }

  chooseAction(entry: Journal): void {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Read',
          icon: 'book',
          handler: () => {
            this.viewSelected(entry);
          }
        }, {
          text: 'Edit',
          icon: 'custom-edit',
          handler: () => {
            this.loadEditEntry(entry);
          }
        },

        {
          text: ' Attach Image',
          icon: 'attach',
          handler: () => {
            this.choosePicture(entry);
          }
      },
          {
            text: ' Delete',
            icon: 'trash',
            handler: () => {
              this.deleteEntry(entry);
            }
        }
      ]
    });
    actionSheet.present();
  }

  presentToast(title: string) {
    let toast = this.toastCtrl.create({
      message: title + ' Deleted ',
      duration: 4500,
      position: 'middle'
    });
  
  
    toast.present();
  }

}
