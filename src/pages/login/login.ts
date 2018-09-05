import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor( public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private auth: AuthService,
    public formBuilder: FormBuilder) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup(){

    this.navCtrl.push(SignupPage);

  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
    };
    this.auth.signInWithEmail(credentials)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          message: error.message,
          buttons: [
            {
              text: "Dismiss",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
	}

}
