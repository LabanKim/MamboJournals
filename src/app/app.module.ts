import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { JournalListService } from '../services/journal-list.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewEntryPage } from '../pages/new-entry/new-entry';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ViewEntryPage } from '../pages/view-entry/view-entry';
import { EditEntryPage } from '../pages/edit-entry/edit-entry';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewEntryPage,
    LoginPage,
    SignupPage,
    ViewEntryPage,EditEntryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewEntryPage,
    LoginPage,
    SignupPage,
    ViewEntryPage,
    EditEntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    JournalListService
  ]
})
export class AppModule {}
