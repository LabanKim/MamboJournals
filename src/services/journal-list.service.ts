import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Journal } from '../model/journal';
 
@Injectable()
export class JournalListService {
 
    private journalListRef: any;
    private currentUser: firebase.User;
    private userId: string;
 
    constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) { 

        afAuth.authState.subscribe(user => {
            this.currentUser = user;
            
            if (this.currentUser) {
                this.userId = this.currentUser.uid;
                
              }
        });


        this.journalListRef = this.db.list<Journal>('journalList/' + this.userId);
    }
 
    getJournalList() {
        return this.db.list<Journal>('journalList/' + this.userId);
    }
 
    addJournal(entry: Journal) {
        console.error('Users id: '+ this.userId);
        return this.db.list<Journal>('journalList/' + this.userId).push(entry);
        
    }
 
    updateJournal(entry: Journal) {
        return this.db.list<Journal>('journalList/' + this.userId).update(entry.key, entry);
    }
 
    removeNote(entry: Journal) {
        return this.db.list<Journal>('journalList/' + this.userId).remove(entry.key);
    }
}