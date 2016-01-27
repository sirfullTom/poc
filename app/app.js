import {App, IonicApp, Platform, Config, Storage, LocalStorage, Events} from 'ionic/ionic';
import {Page, NavController} from 'ionic/ionic';
import {WeldingControls} from './pages/weldingControls/weldingControls';
import {WeldingControlDetails} from './pages/weldingControlDetails/weldingControlDetails';
import {BarCode} from './pages/barCode/barCode';
import {GridPage} from './pages/grid/grid';
import {LoginPage} from './pages/login/login';
import {DataBase} from './libs/dataBase';
import {SoapService} from './libs/soapService';
import {UserInfos} from './libs/userInfos';

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [DataBase, SoapService],
  config: { }
})
class MyApp {		
  constructor(app: IonicApp, platform: Platform, dataBase: DataBase, events: Events, soapService: SoapService) {
    this.app = app;
    this.platform = platform;
    this.initializeApp();
	this.dataBase = dataBase;
	this.soapService = soapService;
	this.events = events;
	
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Controles soudures', component: WeldingControls },
      { title: 'Code barre', component: BarCode },
      { title: 'Grid Icons', component: GridPage },
    ];
	
	//empty user for start
	this.setUserInfos();
	
	this.listenToLoginEvents();
    this.checkAuth();
	//this.rootPage = WeldingControlDetails;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
  
  checkAuth(){
	 debugger;
	  //check authentication informations
	  this.dataBase.getAuth().then((userInfos) => {
	    debugger;
	    this.setUserInfos(userInfos);
		this.soapService.setAuth(userInfos.auth);
		console.log('set user ok');
		this.rootPage = WeldingControls;
	  }, function(){
		this.rootPage = LoginPage;
	  });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (userInfos) => {
	  debugger;
      this.setUserInfos(userInfos);
    });
  }
  
  setUserInfos(userInfos){
	if(userInfos){
		this.userInfos = userInfos;
	}
	else{
		this.userInfos = new UserInfos("", "");
	}
  }
  
  disconnect(){
	this.setUserInfos();
	this.app.components.nav.setRoot(LoginPage);
  }
  
}
