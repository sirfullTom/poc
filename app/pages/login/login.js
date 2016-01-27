import {IonicApp, Page, NavController, Events, Alert} from 'ionic/ionic';
import {WeldingControls} from '../weldingControls/weldingControls';
import {AdfsAuth} from '../../libs/adfsAuth';
import {SoapService} from '../../libs/soapService';
import {DataBase} from '../../libs/dataBase';
import {Config} from '../../libs/config';
import {UserInfos} from '../../libs/userInfos';


@Page({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  constructor(nav: NavController, app: IonicApp, dataBase: DataBase, soapService: SoapService, events: Events) {
	 console.log("LoginPage I'm alive!");
     this.nav = nav;
     this.app = app;
	 this.soapService = soapService;
	 this.app.getComponent('leftMenu').enable(false);
	 this.dataBase = dataBase;
	 this.events = events;
	 this.data = {
		domain: Config.DebugDomain,
        password:  Config.DebugPassword,
		user: Config.DebugUser
      }
	  
	  this.dataBase.clearAuth();
	  this.dataBase.getLogin().then((infos) => {
			this.data.domain = infos.domain;
			this.data.password = infos.password;
			this.data.user = infos.user;
		});

	  this.adfsAuth= new AdfsAuth();
  }

   login() {
		var crmurl = Config.CrmUrl;
		var user = this.data.user;
		var domain = this.data.domain;
		var password = this.data.password;
		if(user && domain && password){
			var auth;
			if (!crmurl.match(/\/$/)) crmurl += '/';		
			if (crmurl.indexOf('dynamics.com') !== -1) {
				auth = this.adfsAuth.GetHeaderOnline(crmurl, user, password);
			} else {
				auth = this.adfsAuth.GetHeaderOnPremise(crmurl, domain, user, password);
			}		
			this.soapService.setAuth(auth);
			this.soapService.crmWhoAmI().then((userId) => {
				this.soapService.retrieve("systemuser", userId, ["firstname", "lastname"]).then((entity) => {
					debugger;
					var userInfos =  new UserInfos(entity.attributes.firstname.value, entity.attributes.lastname.value, auth);
					this.dataBase.setAuth(userInfos);
					this.events.publish('user:login', userInfos);
					this.dataBase.setLogin(this.data);
					this.goToStartPage();
				}, function(error){
					window.alert("retrieve user error " + error);
				});
			  }, function(error){
				window.alert("crmWhoAmI error! " + error);
			  });
		}
		else{
			let alert = Alert.create({
				title: 'Identifiants incorrects',
				subTitle: 'Veuillez vérifiez les informations saisies.',
				buttons: []
			});
			this.nav.present(alert);
		}
  }
  
  goToStartPage(){
	this.app.getComponent('leftMenu').enable(true);
	this.nav.setRoot(WeldingControls);
  }
}
