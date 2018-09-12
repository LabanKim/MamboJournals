import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Journal } from '../model/journal';
import { LoadingController, Loading } from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs';
 
@Injectable()
export class JournalListService {
 
    private journalListRef: any;
    private currentUser: firebase.User;
    private userId: string;
    private loading: Loading;

    
    constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private loadingCtrl: LoadingController) { 

        afAuth.authState.subscribe(user => {
            this.currentUser = user;
            
            if (this.currentUser) {
                this.userId = this.currentUser.uid;
                
              }
        });

    }
 
    getJournalList() {
        this.loading = this.loadingCtrl.create({
            content: 'Loading entries...',
            spinner: 'bubbles'
          });
          this.loading.present();
    
          this.journalListRef = this.db.list<Journal>('journalList/' + this.userId)
                  .snapshotChanges().map( changes => {
                    
                  this.loading.dismiss();
                  return changes.map( c => ({
                      key: c.payload.key, 
                      ...c.payload.val(),
                  }));
              })

        return this.journalListRef;
    }
 
    addJournal(entry: Journal) {
        return this.db.list<Journal>('journalList/' + this.userId).push(entry);
        
    }
 
    updateJournal(entry: Journal) {
        return this.db.list<Journal>('journalList/' + this.userId).update( entry.key, entry);
    }
 
    removeJournal(entry: Journal) {
        return this.db.list<Journal>('journalList/' + this.userId).remove(entry.key);
    }

   
}