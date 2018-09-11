import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController,
  ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController 
  ) {
      this.signupForm = formBuilder.group({
        email: ['',
          Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['',
          Validators.compose([Validators.minLength(6), Validators.required])],
        username: ['',
        Validators.compose([Validators.minLength(5), Validators.required])]
      });
    }

  ionViewDidLoad() {
    
    
  }

  signUp() {

		let data = this.signupForm.value;
		let credentials = {
      username: data.username,
			email: data.email,
			password: data.password
		};
    
    this.auth.signUp(credentials)
    .then(() => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
        this.presentToast(credentials);
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          title: 'Signup Error',
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
    this.loading = this.loadingCtrl.create({
      content: 'Creating account',
        spinner: 'bubbles'
    });
    this.loading.present();

}

presentToast(credentials) {
  let toast = this.toastCtrl.create({
    message: 'Welcome ' + credentials.username,
    duration: 4500,
    position: 'middle'
  });


  toast.present();
}

}
