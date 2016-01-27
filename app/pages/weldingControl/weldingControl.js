import {Page, NavController, NavParams, IonicApp, Modal} from 'ionic/ionic';
import {Viewer} from '../viewer/viewer';
import {WeldingControlDetails} from '../weldingControlDetails/weldingControlDetails';

@Page({
  templateUrl: 'build/pages/weldingControl/weldingControl.html'
})

export class WeldingControl {
  constructor(nav: NavController, app: IonicApp, navParams: NavParams) {
		this.nav = nav;
		this.app = app;
		this.tabOne = WeldingControlDetails;
		this.tabTwo = Viewer;
		this.entity = navParams.get('entity');		
  }
}
