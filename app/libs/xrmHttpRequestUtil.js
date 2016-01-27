

export class XrmHttpRequestUtil {
    constructor() {
        console.log("XrmHttpRequestUtil I'm alive!");
    }
	
    static setXhrXrmHeaders(xhr){
        xhr.setRequestHeader("Accept", "application/xml, text/xml, */*");
        xhr.setRequestHeader("Content-Type", "application/soap+xml; charset=utf-8");
        return xhr;
    }

    static buildXhrPostRequest(url, async){
        var xhr = new XMLHttpRequest();
        xhr.open("Post", url, async);
        xhr = XrmHttpRequestUtil.setXhrXrmHeaders(xhr);
        return xhr;
    }

    static xrmHttpPostRequestSync(url, xml) {
		return new Promise(function (resolve, reject) {
			var xhr = XrmHttpRequestUtil.buildXhrPostRequest(url, false);
			xhr.send(xml);
			if(xhr.status === 200) {
				resolve(xhr.responseXML);
			}
			else {
				reject(xhr.responseXML);
			}
		});
    }

    static xrmHttpPostRequestAsync(url, xml){
		return new Promise( function (resolve, reject) {
			var xhr = XrmHttpRequestUtil.buildXhrPostRequest(url, true);
			xhr.send(xml);
			xhr.onreadystatechange = function () {
			// completed
				if (xhr.readyState === 4) {
					if(xhr.status === 200) {
						resolve(xhr.responseXML);
					}
					else {
						reject(xhr.responseXML);
					}
				}
			};
		});
    }
}