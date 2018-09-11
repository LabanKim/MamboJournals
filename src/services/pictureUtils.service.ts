import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JournalListService } from './journal-list.service';
import { Journal } from '../model/journal';
import { LoadingController, Loading } from 'ionic-angular';

declare var window: any;

@Injectable()
export class PictureUtils {
  private basePath: string = '/avatarPicture';
  objectToSave: Array<any> = new Array;

  private takePictureOptions: CameraOptions = {
    allowEdit: false,
    saveToPhotoAlbum: true,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: this.camera.Direction.BACK,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  private galleryOptions: CameraOptions = {
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 720,
    targetHeight: 720,
    correctOrientation: true
  }

  private loading: Loading;

  constructor(
    public afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private camera: Camera,
    private jouranlListSevice: JournalListService,
    private loadingCtrl: LoadingController) {

  }


  async takePhoto(entry: Journal){
      const options: CameraOptions = {
          quality: 50,
          targetHeight: 600,
          targetWidth: 600,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      } 

      const results = await this.camera.getPicture(options);

      this.loading = this.loadingCtrl.create({
        content: 'Uploading image...',
        spinner: 'bubbles'
      });
      this.loading.present();

      const image = `data:image/jpeg;base64,${results}`;
      const pictures = firebase.storage().ref('images/'+ entry.key);

      pictures.putString(image, 'data_url')
      .then((savedPicture) => {
        savedPicture.ref.getDownloadURL()
      .then( downloadUrl => {
        entry.image = downloadUrl.toString();
        this.jouranlListSevice.updateJournal(entry).then ( () => {
          this.loading.dismiss();
        });
      });

      });

  } catch(e){
      console.error(e);
  }


  async loadFromGallery(entry: Journal){
    const options: CameraOptions = {
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 720,
        targetHeight: 720,
        correctOrientation: true
    }

    const results = await this.camera.getPicture(options);

      this.loading = this.loadingCtrl.create({
        content: 'Uploading image...',
        spinner: 'bubbles'
      });
      this.loading.present();

      const image = `data:image/jpeg;base64,${results}`;
      const pictures = firebase.storage().ref('images/'+ entry.key);

      pictures.putString(image, 'data_url')
      .then((savedPicture) => {
        savedPicture.ref.getDownloadURL()
      .then( downloadUrl => {
        entry.image = downloadUrl.toString();
        this.jouranlListSevice.updateJournal(entry).then ( () => {
          this.loading.dismiss();
        });
      });

      });

} 


}