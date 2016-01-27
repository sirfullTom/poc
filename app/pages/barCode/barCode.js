import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/barCode/barCode.html'
})

export class BarCode {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;    
	this.barCodeData = {};
	this.showBarCode = false;
  }
  
  scanBarCode(event) {
      if (window.cordova) {
          cordova.plugins.barcodeScanner.scan((imageData) => {
              if(!imageData.cancelled){
				  this.barCodeData = imageData;
				  this.showBarCode = true;
				  this.toggleBarCode(true, imageData);
              }
          }, (error) => {
              window.alert("An error happened -> " + error)
        });
      }
  }
  
  toggleBarCode(show, imageData){
    if(show){
		document.getElementById("codeFormat").innerText = imageData.format;
		document.getElementById("codeTxt").innerText = imageData.text;
		document.getElementById("codeMsg").setAttribute("hidden", "");
		document.getElementById("codeContent").removeAttribute("hidden");
	}
	else{
		document.getElementById("codeFormat").innerText = "";
		document.getElementById("codeTxt").innerText = "";
		document.getElementById("codeMsg").removeAttribute("hidden");
		document.getElementById("codeContent").setAttribute("hidden", "");
	}
  }
}
