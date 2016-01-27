import {Injectable} from 'angular2/core';
import {Events} from 'ionic/ionic';
import {SoapXmlParser} from './soapXmlParser';
import {SoapXmlMessages} from './soapXmlMessages';
import {XrmHttpRequestUtil} from './xrmHttpRequestUtil';
import {DataBase} from './dataBase';
import {Config} from './config';

@Injectable()
export class SoapService {
    constructor(events: Events, dataBase: DataBase) {
        console.log("SoapService I'm alive!");
        this.soapXmlParser = new SoapXmlParser();
		this.events = events;
		this.dataBase = dataBase;
    }
	
	setAuth(auth){
		this.auth = auth;
	}
	
	authIfNeeded(){
		return new Promise((resolve, reject) => {
			if(this.auth){
				resolve()
			}
			else
			{
				this.dataBase.getAuth().then((userInfos) =>{
				    this.auth = userInfos.auth;
					resolve();
				  }, () => {
						window.alert("getSoapService pas content!");
				  });
			}
		});
	}

    executeSoap(body){
        var request = [
           '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">',
             this.auth.Header,
             body,
           '</s:Envelope>'
        ].join('');

		return new Promise((resolve, reject) => {
			this.authIfNeeded().then(() => {
				XrmHttpRequestUtil.xrmHttpPostRequestAsync(Config.CrmUrl + 'XRMServices/2011/Organization.svc', request).then((responseXML) =>{
					resolve(responseXML);
				},
				(error) => {
					reject("aaaaa executeSoap2");
				});
			}, (error) => { 
				reject("aaaaa executeSoap1");
			});
		});
    }

    fetch(fetchXml){
		return new Promise((resolve, reject) => {
			this.executeSoap(SoapXmlMessages.getFetchMoreXml(fetchXml)).then((responseXML) => {
				resolve(this.soapXmlParser.getFetchResult(responseXML));
			}, (error) => { 
				reject(error);
			});
		});
    }

	retrieve(etn, id, columns){
		return new Promise((resolve, reject) => {
			this.executeSoap(SoapXmlMessages.getRetrieveXml(id, etn, columns)).then((responseXML) => {
				resolve(this.soapXmlParser.getRetrieveResult(responseXML));
			}, (error) => { 
				reject(error);
			});
		});
	}
	
    crmWhoAmI(){
		return new Promise( (resolve, reject) => {
			this.executeSoap(SoapXmlMessages.getWhoAmIXml()).then((responseXML) => {
				var userId = this.soapXmlParser.findFirstKeyValue(responseXML, "UserId");
				resolve(userId);
			}, (error) => { 
				reject(error);
			});
		});
    }
}
