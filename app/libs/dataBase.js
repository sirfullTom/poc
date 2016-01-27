import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic/ionic';
import {UserInfos} from './userInfos';

@Injectable()
export class DataBase {
	constructor(events: Events) {
		this.storage = new Storage(LocalStorage);
		this.events = events;
		console.log("DataBase I'm alive!");
		this.LOG_KEY = "loginInfos";
		this.AUTH_KEY = "authInfos";
	}
	
	 getLogin() {		
		return new Promise((resolve, reject) =>{
			this.storage.get(this.LOG_KEY).then((loginInfos) => {
			  if(loginInfos != null && loginInfos != "null"){
					resolve(JSON.parse(loginInfos));
			  }
			  else{
				reject();
			  }
			});
		});
	 }
	 
     setLogin(loginInfos) {
	 	this.storage.set(this.LOG_KEY, JSON.stringify(loginInfos));
	 }
	 
	 
	 getAuth() {
		return new Promise((resolve, reject) =>{
			this.storage.get(this.AUTH_KEY).then((authInfos) => {
			  if(authInfos != null && authInfos != "null"){
					resolve(UserInfos.fromDb(JSON.parse(authInfos)));
			  }
			  else{
				reject();
			  }
			});
		});
	 }

	 setAuth(userInfos) {
		this.storage.set(this.AUTH_KEY, JSON.stringify(userInfos));
	 }

	clearAuth() {
		this.storage.remove(this.AUTH_KEY);
	}
	
 }