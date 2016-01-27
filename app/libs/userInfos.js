export class UserInfos {
	constructor(firstName, lastName, auth) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.auth = auth;
	}
	static fromDb(obj){
		return new UserInfos(obj.firstName, obj.lastName, obj.auth);
	}
	// name = null;
	// firstName = null;
}