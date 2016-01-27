import {Page, NavController, NavParams, IonicApp,, ViewController} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/updateStatus/updateStatus.html'
})

export class UpdateStatus {
  constructor(nav: NavController, app: IonicApp, navParams: NavParams, viewCtrl: ViewController) {
		this.nav = nav;
		this.app = app;
		this.viewCtrl = viewCtrl;
		this.ngControl= "langs";
  }
  dismiss(){
	 this.viewCtrl.dismiss();
  }
  update(){
	 this.viewCtrl.dismiss();
  }
}
