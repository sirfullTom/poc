import {Page, NavController, NavParams, Camera, IonicApp} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/viewer/viewer.html'
})

export class Viewer {
  constructor(nav: NavController, app: IonicApp, navParams: NavParams) {
		this.nav = nav;
		this.app = app;
		//this.entity = nav.parent.rootNav._views[1].data.entity;
		this.pictures = [];
  }
  takePhoto(event){
	 navigator.camera.getPicture((picData) =>
	 {
		var base64Image = "data:image/jpeg;base64," + picData;
		this.pictures.push({"data":base64Image, title:"Titre de la photo", date:"date de la photo" description : "Données relatives la photo (famille, type, description)"}]);
	 }, 
	 function() { },
	 {
      quality: 50,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      sourceType: navigator.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: navigator.camera.EncodingType.JPEG,
      //targetWidth: 100,
      //targetHeight: 400,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    });
  }
}
