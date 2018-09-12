import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JournalListService } from '../../services/journal-list.service';
import { HomePage } from '../home/home'

import * as HighCharts from 'highcharts';
import { Journal } from '../../model/journal';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  public items;
  public itemRef: firebase.database.Reference;
  private currentUser: firebase.User;
  private userId: string;

  totalEntries: any;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public navParams: NavParams, private journalListService: JournalListService) {
    afAuth.authState.subscribe(user => {
      this.currentUser = user;
      
      if (this.currentUser) {
          this.userId = this.currentUser.uid;
          
        }
  });
  }

  ionViewWillLoad(){

    this.itemRef = firebase.database().ref('journalList/' + this.userId);
        this.itemRef.on('value', itemSnapshot => {
            this.items = [];
            itemSnapshot.forEach( itemSnap => {
              this.items.push(itemSnap.val());
              return false;
            });
            console.log(this.items)
          });
    this.totalEntries = this.items.length;

  }

  ionViewDidLoad() {

    console.log(this.items.date);

    var dateObj = new Date(this.items[1].date);
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth();
    var date = dateObj.getDate();

    console.log(dateObj);

    var monthArray = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var myChart = HighCharts.chart('container', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Journal Entries'
      },
      xAxis: {
        categories: months
      },
      yAxis: {
        title: {
          text: 'Entries Made'
        }
      },
      series: [{
        name: 'Entry',
        data: (function() {
          var data = [];
        
          for (let i = 0; i < months.length; i += 1) {
            data.push({
              x: months.values[i],
              y: Math.floor(Math.random() * 10) + 0
            });
          }
          return data;
        }())
      }]
    });

  }

  

  

}
