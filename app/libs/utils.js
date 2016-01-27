

export class Utils {
	constructor() {
	    console.log("Utils I'm alive!");
	}
	
	static xmlEncode(strInput) {

	    var c,
            encoded = '';

	    if (strInput === null) {
	        return null;
	    }
	    if (strInput === '') {
	        return '';
	    }

	    for (var cnt = 0, max = strInput.length; cnt < max; cnt++) {

	        c = strInput.charCodeAt(cnt);

	        if (((c > 96) && (c < 123))
                || ((c > 64) && (c < 91))
                || (c === 32)
                || ((c > 47) && (c < 58))
                || (c === 46)
                || (c === 44)
                || (c === 45)
                || (c === 95)) {
	            encoded = encoded + String.fromCharCode(c);
	        }
	        else {
	            encoded = encoded + '&#' + c + ';';
	        }
	    }

	    return encoded;
	}
}