import {Page, NavController, IonicApp} from 'ionic/ionic';
import {LoginPage} from '../login/login';
import {WeldingControl} from '../weldingControl/weldingControl';
import {SoapService} from '../../libs/soapService';

@Page({
  templateUrl: 'build/pages/weldingControls/weldingControls.html'
})
export class WeldingControls {
  constructor(nav: NavController, app: IonicApp, soapService: SoapService) {
		this.nav = nav;
		this.app = app;
		this.searchQuery = '';
		this.entities = [];
		this.initialEntities = [];
		this.loading = true;
		this.soapService = soapService;
		this.init();
  }
  
  init(){
	debugger;
	var fetchXml = [
				'<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="irm_weldcontrol">'+
					'<attribute name="irm_affaireid" />'+
					'<attribute name="irm_criticalindicator" />'+
					'<attribute name="irm_weldcontrolid" />'+
					'<attribute name="irm_caseitemid" />'+
					'<attribute name="irm_controlstatus" />'+
					'<attribute name="irm_planid" />'+
					'<attribute name="irm_weldid" />'+
					'<attribute name="irm_weldingcontroltype" />'+
					'<filter type="and">'+
					  '<condition attribute="irm_weldid" operator="not-null" />'+
					  '<condition attribute="statecode" operator="eq" value="0" />'+
					'</filter>'+
				  '</entity>'+
				'</fetch>'
			];
			this.soapService.fetch(fetchXml.join("")).then((result) =>
			{			
				//order items
				var sortedResults = result.entities.sort((a, b) =>{
					if (a.attributes.irm_affaireid.name < b.attributes.irm_affaireid.name) return -1;
					if (a.attributes.irm_affaireid.name > b.attributes.irm_affaireid.name) return 1;
					
					if (a.attributes.irm_caseitemid.name < b.attributes.irm_caseitemid.name) return -1;
					if (a.attributes.irm_caseitemid.name > b.attributes.irm_caseitemid.name) return 1;
					
					if (a.attributes.irm_planid.name < b.attributes.irm_planid.name) return -1;
					if (a.attributes.irm_planid.name > b.attributes.irm_planid.name) return 1;
					    
					if (a.attributes.irm_weldid.name < b.attributes.irm_weldid.name) return -1;
					if (a.attributes.irm_weldid.name > b.attributes.irm_weldid.name) return 1;
					  
					if (a.attributes.irm_weldingcontroltype.name < b.attributes.irm_weldingcontroltype.name) return -1;
					if (a.attributes.irm_weldingcontroltype.name > b.attributes.irm_weldingcontroltype.name) return 1;
					    
					if (a.attributes.irm_controlstatus.formattedValue < b.attributes.irm_controlstatus.formattedValue) return -1;
					if (a.attributes.irm_controlstatus.formattedValue > b.attributes.irm_controlstatus.formattedValue) return 1;
					     
					if (a.attributes.irm_criticalindicator.formattedValue < b.attributes.irm_criticalindicator.formattedValue) return -1;
					if (a.attributes.irm_criticalindicator.formattedValue > b.attributes.irm_criticalindicator.formattedValue) return 1;
					return 0;
				});
				
				
				let lastCaseId = null;
				for(var i=0; i< sortedResults.length; i++) {
					let caseEnt = sortedResults[i].attributes.irm_affaireid;
					if(lastCaseId != caseEnt.guid){
						this.entities.push({'name' : caseEnt.name, 'controls' : [sortedResults[i]]});
					}
					else{
						this.entities[this.entities.length-1].controls.push(sortedResults[i]);
					}
					lastCaseId = caseEnt.guid;
				}
				this.initialEntities = this.entities;
				this.loading = false;
			}, (error) =>
			{
				window.alert("fetch pas content");
			});
  }

  itemTapped(event, entity) {
	 this.nav.push(WeldingControl, {entity: entity})
  }
  
  getItems(searchbar){
	  this.entities =  this.initialEntities;
	  var q = searchbar.value.toLowerCase();
	  if (q.trim() == '') return;
	  this.entities = this.initialEntities.filter((v) => {
		  if (v.name.toLowerCase().indexOf(q) > -1) {
			return true;
		  }
		  return false;
	  })
  }
}
