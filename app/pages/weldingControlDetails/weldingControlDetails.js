import {Page, NavController, NavParams, IonicApp, Modal} from 'ionic/ionic';
import {UpdateStatus} from '../updateStatus/updateStatus';

@Page({
  templateUrl: 'build/pages/weldingControlDetails/weldingControlDetails.html'
})

export class WeldingControlDetails {
  constructor(nav: NavController, app: IonicApp, navParams: NavParams) {
		this.nav = nav;
		this.app = app;
		this.entity = nav.parent.rootNav._views[1].data.entity;
		/*this.entity  = {
			"attributes" : {
				irm_caseitemid : { name : "name"},
				irm_planid : { name : "name"},
				irm_weldid : { name : "name"},
				irm_affaireid : { name : "name"},
				irm_weldingcontroltype: { formattedValue : "name"},
				irm_controlstatus : { formattedValue : "name"}
			}
		}*/
  }
  updateStatus(){
	let modal = Modal.create(UpdateStatus);
	this.nav.present(modal);
  }
}
