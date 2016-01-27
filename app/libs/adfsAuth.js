
export class AdfsAuth {
	constructor() {
		console.log("AdfsAuth I'm alive!");
	}
	
	
	
	
	Base64 = {
		// private property
		_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		// public method for encoding
		encode: function (input) {
			var output = '';
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = this._utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
			}
			return output;
		},
		// public method for decoding
		decode: function (input) {
			var output = '';
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
			while (i < input.length) {
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = this._utf8_decode(output);
			return output;
		},
		// private method for UTF-8 encoding
		_utf8_encode: function (string) {
			string = string.replace(/\r\n/g, '\n');
			var utftext = '';
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		// private method for UTF-8 decoding
		_utf8_decode: function (utftext) {
			var string = '';
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}
	
    jsSHA =(function (A) {
			function q(a, d, b) {
				var f = 0, e = [0], c = "", g = null, c = b || "UTF8"; if ("UTF8" !== c && "UTF16" !== c) throw "encoding must be UTF8 or UTF16"; if ("HEX" === d) { if (0 !== a.length % 2) throw "srcString of HEX type must be in byte increments"; g = t(a); f = g.binLen; e = g.value } else if ("ASCII" === d || "TEXT" === d) g = v(a, c), f = g.binLen, e = g.value; else if ("B64" === d) g = w(a), f = g.binLen, e = g.value; else throw "inputFormat must be HEX, TEXT, ASCII, or B64"; this.getHash = function (a, b, c, d) {
					var g = null, h = e.slice(), k = f, m; 3 === arguments.length ? "number" !==
					typeof c && (d = c, c = 1) : 2 === arguments.length && (c = 1); if (c !== parseInt(c, 10) || 1 > c) throw "numRounds must a integer >= 1"; switch (b) { case "HEX": g = x; break; case "B64": g = y; break; default: throw "format must be HEX or B64"; } if ("SHA-1" === a) for (m = 0; m < c; m++) h = s(h, k), k = 160; else throw "Chosen SHA variant is not supported"; return g(h, z(d))
				}; this.getHMAC = function (a, b, d, g, q) {
					var h, k, m, l, r = [], u = []; h = null; switch (g) { case "HEX": g = x; break; case "B64": g = y; break; default: throw "outputFormat must be HEX or B64"; } if ("SHA-1" === d) k = 64, l =
					160; else throw "Chosen SHA variant is not supported"; if ("HEX" === b) h = t(a), m = h.binLen, h = h.value; else if ("ASCII" === b || "TEXT" === b) h = v(a, c), m = h.binLen, h = h.value; else if ("B64" === b) h = w(a), m = h.binLen, h = h.value; else throw "inputFormat must be HEX, TEXT, ASCII, or B64"; a = 8 * k; b = k / 4 - 1; if (k < m / 8) { if ("SHA-1" === d) h = s(h, m); else throw "Unexpected error in HMAC implementation"; h[b] &= 4294967040 } else k > m / 8 && (h[b] &= 4294967040); for (k = 0; k <= b; k += 1) r[k] = h[k] ^ 909522486, u[k] = h[k] ^ 1549556828; if ("SHA-1" === d) d = s(u.concat(s(r.concat(e),
					a + f)), a + l); else throw "Unexpected error in HMAC implementation"; return g(d, z(q))
				}
			} function v(a, d) { var b = [], f, e = [], c = 0, g; if ("UTF8" === d) for (g = 0; g < a.length; g += 1) for (f = a.charCodeAt(g), e = [], 2048 < f ? (e[0] = 224 | (f & 61440) >>> 12, e[1] = 128 | (f & 4032) >>> 6, e[2] = 128 | f & 63) : 128 < f ? (e[0] = 192 | (f & 1984) >>> 6, e[1] = 128 | f & 63) : e[0] = f, f = 0; f < e.length; f += 1) b[c >>> 2] |= e[f] << 24 - c % 4 * 8, c += 1; else if ("UTF16" === d) for (g = 0; g < a.length; g += 1) b[c >>> 2] |= a.charCodeAt(g) << 16 - c % 4 * 8, c += 2; return { value: b, binLen: 8 * c } } function t(a) {
				var d = [], b = a.length, f,
				e; if (0 !== b % 2) throw "String of HEX type must be in byte increments"; for (f = 0; f < b; f += 2) { e = parseInt(a.substr(f, 2), 16); if (isNaN(e)) throw "String of HEX type contains invalid characters"; d[f >>> 3] |= e << 24 - f % 8 * 4 } return { value: d, binLen: 4 * b }
			} function w(a) {
				var d = [], b = 0, f, e, c, g, p; if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw "Invalid character in base-64 string"; f = a.indexOf("="); a = a.replace(/\=/g, ""); if (-1 !== f && f < a.length) throw "Invalid '=' found in base-64 string"; for (e = 0; e < a.length; e += 4) {
					p = a.substr(e, 4); for (c = g = 0; c <
					p.length; c += 1) f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(p[c]), g |= f << 18 - 6 * c; for (c = 0; c < p.length - 1; c += 1) d[b >> 2] |= (g >>> 16 - 8 * c & 255) << 24 - b % 4 * 8, b += 1
				} return { value: d, binLen: 8 * b }
			} function x(a, d) { var b = "", f = 4 * a.length, e, c; for (e = 0; e < f; e += 1) c = a[e >>> 2] >>> 8 * (3 - e % 4), b += "0123456789abcdef".charAt(c >>> 4 & 15) + "0123456789abcdef".charAt(c & 15); return d.outputUpper ? b.toUpperCase() : b } function y(a, d) {
				var b = "", f = 4 * a.length, e, c, g; for (e = 0; e < f; e += 3) for (g = (a[e >>> 2] >>> 8 * (3 - e % 4) & 255) << 16 | (a[e + 1 >>>
				2] >>> 8 * (3 - (e + 1) % 4) & 255) << 8 | a[e + 2 >>> 2] >>> 8 * (3 - (e + 2) % 4) & 255, c = 0; 4 > c; c += 1) b = 8 * e + 6 * c <= 32 * a.length ? b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >>> 6 * (3 - c) & 63) : b + d.b64Pad; return b
			} function z(a) {
				var d = { outputUpper: !1, b64Pad: "=" }; try { a.hasOwnProperty("outputUpper") && (d.outputUpper = a.outputUpper), a.hasOwnProperty("b64Pad") && (d.b64Pad = a.b64Pad) } catch (b) { } if ("boolean" !== typeof d.outputUpper) throw "Invalid outputUpper formatting option"; if ("string" !== typeof d.b64Pad) throw "Invalid b64Pad formatting option";
				return d
			} function B(a, d) { return a << d | a >>> 32 - d } function C(a, d, b) { return a ^ d ^ b } function D(a, d, b) { return a & d ^ ~a & b } function E(a, d, b) { return a & d ^ a & b ^ d & b } function F(a, d) { var b = (a & 65535) + (d & 65535); return ((a >>> 16) + (d >>> 16) + (b >>> 16) & 65535) << 16 | b & 65535 } function G(a, d, b, f, e) { var c = (a & 65535) + (d & 65535) + (b & 65535) + (f & 65535) + (e & 65535); return ((a >>> 16) + (d >>> 16) + (b >>> 16) + (f >>> 16) + (e >>> 16) + (c >>> 16) & 65535) << 16 | c & 65535 } function s(a, d) {
				var b = [], f, e, c, g, p, q, s = D, t = C, v = E, h = B, k = F, m, l, r = G, u, n = [1732584193, 4023233417, 2562383102,
				271733878, 3285377520]; a[d >>> 5] |= 128 << 24 - d % 32; a[(d + 65 >>> 9 << 4) + 15] = d; u = a.length; for (m = 0; m < u; m += 16) { f = n[0]; e = n[1]; c = n[2]; g = n[3]; p = n[4]; for (l = 0; 80 > l; l += 1) b[l] = 16 > l ? a[l + m] : h(b[l - 3] ^ b[l - 8] ^ b[l - 14] ^ b[l - 16], 1), q = 20 > l ? r(h(f, 5), s(e, c, g), p, 1518500249, b[l]) : 40 > l ? r(h(f, 5), t(e, c, g), p, 1859775393, b[l]) : 60 > l ? r(h(f, 5), v(e, c, g), p, 2400959708, b[l]) : r(h(f, 5), t(e, c, g), p, 3395469782, b[l]), p = g, g = c, c = h(e, 30), e = f, f = q; n[0] = k(f, n[0]); n[1] = k(e, n[1]); n[2] = k(c, n[2]); n[3] = k(g, n[3]); n[4] = k(p, n[4]) } return n
			} return q;
		})()
	
	
	
	/// <summary>Gets a CRM Online SOAP header & expiration.</summary>
	/// <param name="url" type="String">The Url of the CRM Online organization (https://org.crm.dynamics.com).</param>
	/// <param name="username" type="String">Username of a valid CRM user.</param>
	/// <param name="password" type="String">Password of a valid CRM user.</param>
	/// <returns type="Object">An object containing the SOAP header and expiration date/time of the header.</returns>
	GetHeaderOnline = function (url, username, password) {
		if (!url.match(/\/$/)) url += '/';
		var urnAddress = this.GetUrnOnline(url);
		var now = new Date();
		var xml = [];
		xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">');
		xml.push('<s:Header>');
		xml.push('<a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>');
		xml.push('<a:MessageID>urn:uuid:' + this.CreateGuid() + '</a:MessageID>');
		xml.push('<a:ReplyTo>');
		xml.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
		xml.push('</a:ReplyTo>');
		xml.push('<a:To s:mustUnderstand="1">https://login.microsoftonline.com/RST2.srf</a:To>');
		xml.push('<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<u:Timestamp u:Id="_0">');
		xml.push('<u:Created>' + now.toISOString() + '</u:Created>');
		xml.push('<u:Expires>' + new Date(now.setMinutes(now.getMinutes() + 60)).toISOString() + '</u:Expires>');
		xml.push('</u:Timestamp>');
		xml.push('<o:UsernameToken u:Id="uuid-' + this.CreateGuid() + '-1">');
		xml.push('<o:Username>' + username + '</o:Username>');
		xml.push('<o:Password>' + password + '</o:Password>');
		xml.push('</o:UsernameToken>');
		xml.push('</o:Security>');
		xml.push('</s:Header>');
		xml.push('<s:Body>');
		xml.push('<trust:RequestSecurityToken xmlns:trust="http://schemas.xmlsoap.org/ws/2005/02/trust">');
		xml.push('<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">');
		xml.push('<a:EndpointReference>');
		xml.push('<a:Address>urn:' + urnAddress + '</a:Address>');
		xml.push('</a:EndpointReference>');
		xml.push('</wsp:AppliesTo>');
		xml.push('<trust:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</trust:RequestType>');
		xml.push('</trust:RequestSecurityToken>');
		xml.push('</s:Body>');
		xml.push('</s:Envelope>');

		var authentication = {};
		var request = xml.join('');
		var req = new XMLHttpRequest();
		req.open('POST', 'https://login.microsoftonline.com/RST2.srf', false);
		req.setRequestHeader('Connection', 'Keep-Alive');
		req.setRequestHeader('Content-Type', 'application/soap+xml; charset=UTF-8');
		req.onreadystatechange = function () {
			if (req.readyState === 4) {
				if (req.status === 200) {
					var token = req.responseXML.getElementsByTagName("CipherValue");
					var keyIdentifer = req.responseXML.getElementsByTagName('KeyIdentifier')[0].textContent;
					authentication.TokenExpires = req.responseXML.getElementsByTagName('Expires')[0].textContent;
					authentication.Header = this.CreateSOAPHeaderOnline(url, keyIdentifer, token[0].textContent, token[1].textContent);
				}
			}
		};
		req.send(request);
		return authentication;
	};

	/// <summary>Gets a CRM Online SOAP header.</summary>
	/// <param name="url" type="String">The Url of the CRM Online organization (https://org.crm.dynamics.com).</param>
	/// <param name="keyIdentifer" type="String">The KeyIdentifier from the initial request.</param>
	/// <param name="token0" type="String">The first token from the initial request.</param>
	/// <param name="token1" type="String">The second token from the initial request.</param>
	/// <returns type="String">The XML SOAP header to be used in future requests.</returns>
	CreateSOAPHeaderOnline = function (url, keyIdentifer, token0, token1) {
		var xml = [];
		xml.push('<s:Header>');
		xml.push('<a:Action s:mustUnderstand="1">http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute</a:Action>');
		xml.push('<Security xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<EncryptedData Id="Assertion0" Type="http://www.w3.org/2001/04/xmlenc#Element" xmlns="http://www.w3.org/2001/04/xmlenc#">');
		xml.push('<EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#tripledes-cbc"/>');
		xml.push('<ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">');
		xml.push('<EncryptedKey>');
		xml.push('<EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p"/>');
		xml.push('<ds:KeyInfo Id="keyinfo">');
		xml.push('<wsse:SecurityTokenReference xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<wsse:KeyIdentifier EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary" ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile-1.0#X509SubjectKeyIdentifier">' + keyIdentifer + '</wsse:KeyIdentifier>');
		xml.push('</wsse:SecurityTokenReference>');
		xml.push('</ds:KeyInfo>');
		xml.push('<CipherData>');
		xml.push('<CipherValue>' + token0 + '</CipherValue>');
		xml.push('</CipherData>');
		xml.push('</EncryptedKey>');
		xml.push('</ds:KeyInfo>');
		xml.push('<CipherData>');
		xml.push('<CipherValue>' + token1 + '</CipherValue>');
		xml.push('</CipherData>');
		xml.push('</EncryptedData>');
		xml.push('</Security>');
		xml.push('<a:MessageID>urn:uuid:' + this.CreateGuid() + '</a:MessageID>');
		xml.push('<a:ReplyTo>');
		xml.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
		xml.push('</a:ReplyTo>');
		xml.push('<a:To s:mustUnderstand="1">' + url + 'XRMServices/2011/Organization.svc</a:To>');
		xml.push('</s:Header>');
		return xml.join('');
	};

	/// <summary>Gets the correct URN Address based on the Online region.</summary>
	/// <param name="url" type="String">The Url of the CRM Online organization (https://org.crm.dynamics.com).</param>
	/// <returns type="String">URN Address.</returns>
	GetUrnOnline = function (url) {
		if (url.toUpperCase().indexOf('CRM2.DYNAMICS.COM') !== -1) {
			return 'crmsam:dynamics.com';
		}
		if (url.toUpperCase().indexOf('CRM4.DYNAMICS.COM') !== -1) {
			return 'crmemea:dynamics.com';
		}
		if (url.toUpperCase().indexOf('CRM5.DYNAMICS.COM') !== -1) {
			return 'crmapac:dynamics.com';
		}
		if (url.toUpperCase().indexOf('CRM6.DYNAMICS.COM') !== -1) {
			return 'crmoce:dynamics.com';
		}
		if (url.toUpperCase().indexOf('CRM7.DYNAMICS.COM') !== -1) {
			return 'crmjpn:dynamics.com';
		}
		if (url.toUpperCase().indexOf('CRM9.DYNAMICS.COM') !== -1) {
			return 'crmgcc:dynamics.com';
		}
		return 'crmna:dynamics.com';
	};

	/// <summary>Gets a CRM On Premise SOAP header & expiration.</summary>
	/// <param name="url" type="String">The Url of the CRM On Premise (IFD) organization (https://org.domain.com).</param>
	/// <param name="domain" type="String">Domain name of a vaid CRM user.</param>
	/// <param name="username" type="String">Username of a valid CRM user.</param>
	/// <param name="password" type="String">Password of a valid CRM user.</param>
	/// <returns type="Object">An object containing the SOAP header and expiration date/time of the header.</returns>
	GetHeaderOnPremise = function (url, domain, username, password) {
		if (!url.match(/\/$/)) url += "/";
		username = domain + "\\" + username;
		var adfsUrl = this.GetADFS(url);
		var now = new Date();
		var urnAddress = url + 'XRMServices/2011/Organization.svc';
		var usernamemixed = adfsUrl + '/13/usernamemixed';
		var xml = [];
		xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">');
		xml.push('<s:Header>');
		xml.push('<a:Action s:mustUnderstand="1">http://docs.oasis-open.org/ws-sx/ws-trust/200512/RST/Issue</a:Action>');
		xml.push('<a:MessageID>urn:uuid:' + this.CreateGuid() + '</a:MessageID>');
		xml.push('<a:ReplyTo>');
		xml.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
		xml.push('</a:ReplyTo>');
		xml.push('<Security s:mustUnderstand="1" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<u:Timestamp  u:Id="' + this.CreateGuid() + '">');
		xml.push('<u:Created>' + now.toISOString() + '</u:Created>');
		xml.push('<u:Expires>' + new Date(now.setMinutes(now.getMinutes() + 5)).toISOString() + '</u:Expires>');
		xml.push('</u:Timestamp>');
		xml.push('<UsernameToken u:Id="' + this.CreateGuid() + '">');
		xml.push('<Username>' + username + '</Username>');
		xml.push('<Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">' + password + '</Password>');
		xml.push('</UsernameToken>');
		xml.push('</Security>');
		xml.push('<a:To s:mustUnderstand="1">' + usernamemixed + '</a:To>');
		xml.push('</s:Header>');
		xml.push('<s:Body>');
		xml.push('<trust:RequestSecurityToken xmlns:trust="http://docs.oasis-open.org/ws-sx/ws-trust/200512">');
		xml.push('<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">');
		xml.push('<a:EndpointReference>');
		xml.push('<a:Address>' + urnAddress + '</a:Address>');
		xml.push('</a:EndpointReference>');
		xml.push('</wsp:AppliesTo>');
		xml.push('<trust:RequestType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue</trust:RequestType>');
		xml.push('</trust:RequestSecurityToken>');
		xml.push('</s:Body>');
		xml.push('</s:Envelope>\n');
		

		var authentication = {};
		var request = xml.join("");
		var req = new XMLHttpRequest();
		req.open("POST", usernamemixed, false);
		req.setRequestHeader("Connection", "Keep-Alive");
		req.setRequestHeader("Content-Type", "application/soap+xml; charset=UTF-8");
		var ctxt = this;
		req.onreadystatechange = function () {
			if (req.readyState === 4) {
				if (req.status === 200) {				
					var tokens = req.responseXML.getElementsByTagNameNS("http://www.w3.org/2001/04/xmlenc#", "CipherValue");
					if(tokens[0].tagName.startsWith("e")){
						var token0 = tokens[0].textContent;
						var token1 = tokens[1].textContent;
					}
					else{
						var token0 = tokens[1].textContent;
						var token1 = tokens[0].textContent;
					}
					var keyIdentifer = req.responseXML.getElementsByTagNameNS("http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd", "KeyIdentifier")[0].textContent;
					var issuerNameX509 = req.responseXML.getElementsByTagName("X509IssuerName")[0].textContent;
					var serialNumberX509 = req.responseXML.getElementsByTagName("X509SerialNumber")[0].textContent;
					var serverSecret = req.responseXML.getElementsByTagNameNS("http://docs.oasis-open.org/ws-sx/ws-trust/200512", "BinarySecret")[0].textContent;
					
					var created = new Date(now.setMinutes(now.getMinutes() - 1)).toISOString();
					var expires = new Date(now.setMinutes(now.getMinutes() + 60)).toISOString();
					var timestamp = '<u:Timestamp xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" u:Id="_0"><u:Created>' + created + '</u:Created><u:Expires>' + expires + '</u:Expires></u:Timestamp>';
					var hashObj = new ctxt.jsSHA(timestamp, "TEXT");
					var digestValue = hashObj.getHash("SHA-1", "B64", 1);
					var signedInfo = '<SignedInfo xmlns="http://www.w3.org/2000/09/xmldsig#"><CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></CanonicalizationMethod><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#hmac-sha1"></SignatureMethod><Reference URI="#_0"><Transforms><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>' + digestValue + '</DigestValue></Reference></SignedInfo>';
					var b64SignedInfo = ctxt.Base64.encode(signedInfo);;
					var shaObj = new ctxt.jsSHA(b64SignedInfo, "B64");
					var signatureValue = shaObj.getHMAC(serverSecret, "B64", "SHA-1", "B64");
					var tokenExpires = req.responseXML.getElementsByTagNameNS("http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd", "Expires");
					authentication.TokenExpires = tokenExpires[0].tagName.startsWith("wsu") ? tokenExpires[0].textContent : tokenExpires[1].textContent;
					authentication.Header = ctxt.CreateSOAPHeaderOnPremise(url, keyIdentifer, token0, token1, issuerNameX509, serialNumberX509, signatureValue, digestValue, created, expires);
				}
			}
		};
		req.send(request);
		return authentication;
	};

	/// <summary>Gets a CRM On Premise (IFD) SOAP header.</summary>
	/// <param name="url" type="String">The Url of the CRM On Premise (IFD) organization (https://org.domain.com).</param>
	/// <param name="keyIdentifer" type="String">The KeyIdentifier from the initial request..</param>
	/// <param name="token0" type="String">The first token from the initial request.</param>
	/// <param name="token1" type="String">The second token from the initial request.</param>
	/// <param name="issuerNameX509" type="String">The certificate issuer.</param>
	/// <param name="serialNumberX509" type="String">The certificate serial number.</param>
	/// <param name="signatureValue" type="String">The hashsed value of the header signature.</param>
	/// <param name="digestValue" type="String">The hashed value of the header timestamp.</param>
	/// <param name="created" type="String">The header created date/time.</param>
	/// <param name="expires" type="String">The header expiration date/tim.</param>
	/// <returns type="String">The XML SOAP header to be used in future requests.</returns>
	CreateSOAPHeaderOnPremise = function (url, keyIdentifer, token0, token1, issuerNameX509, serialNumberX509, signatureValue, digestValue, created, expires) {
		var xml = [];
		xml.push('<s:Header>');
		xml.push('<a:Action s:mustUnderstand="1">http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute</a:Action>');
		xml.push('<a:MessageID>urn:uuid:' + this.CreateGuid() + '</a:MessageID>');
		xml.push('<a:ReplyTo>');
		xml.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
		xml.push('</a:ReplyTo>');
		xml.push('<a:To s:mustUnderstand="1">' + url + 'XRMServices/2011/Organization.svc</a:To>');
		xml.push('<o:Security xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<u:Timestamp xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" u:Id="_0">');
		xml.push('<u:Created>' + created + '</u:Created>');
		xml.push('<u:Expires>' + expires + '</u:Expires>');
		xml.push('</u:Timestamp>');
		xml.push('<xenc:EncryptedData Type="http://www.w3.org/2001/04/xmlenc#Element" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#">');
		xml.push('<xenc:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>');
		xml.push('<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">');
		xml.push('<e:EncryptedKey xmlns:e="http://www.w3.org/2001/04/xmlenc#">');
		xml.push('<e:EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p">');
		xml.push('<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>');
		xml.push('</e:EncryptionMethod>');
		xml.push('<KeyInfo>');
		xml.push('<o:SecurityTokenReference xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<X509Data>');
		xml.push('<X509IssuerSerial>');
		xml.push('<X509IssuerName>' + issuerNameX509 + '</X509IssuerName>');
		xml.push('<X509SerialNumber>' + serialNumberX509 + '</X509SerialNumber>');
		xml.push('</X509IssuerSerial>');
		xml.push('</X509Data>');
		xml.push('</o:SecurityTokenReference>');
		xml.push('</KeyInfo>');
		xml.push('<e:CipherData>');
		xml.push('<e:CipherValue>' + token0 + '</e:CipherValue>');
		xml.push('</e:CipherData>');
		xml.push('</e:EncryptedKey>');
		xml.push('</KeyInfo>');
		xml.push('<xenc:CipherData>');
		xml.push('<xenc:CipherValue>' + token1 + '</xenc:CipherValue>');
		xml.push('</xenc:CipherData>');
		xml.push('</xenc:EncryptedData>');
		xml.push('<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">');
		xml.push('<SignedInfo>');
		xml.push('<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>');
		xml.push('<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#hmac-sha1"/>');
		xml.push('<Reference URI="#_0">');
		xml.push('<Transforms>');
		xml.push('<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>');
		xml.push('</Transforms>');
		xml.push('<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>');
		xml.push('<DigestValue>' + digestValue + '</DigestValue>');
		xml.push('</Reference>');
		xml.push('</SignedInfo>');
		xml.push('<SignatureValue>' + signatureValue + '</SignatureValue>');
		xml.push('<KeyInfo>');
		xml.push('<o:SecurityTokenReference xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
		xml.push('<o:KeyIdentifier ValueType="http://docs.oasis-open.org/wss/oasis-wss-saml-token-profile-1.0#SAMLAssertionID">' + keyIdentifer + '</o:KeyIdentifier>');
		xml.push('</o:SecurityTokenReference>');
		xml.push('</KeyInfo>');
		xml.push('</Signature>');
		xml.push('</o:Security>');
		xml.push('</s:Header>');
		return xml.join("");
	};

	/// <summary>Gets the name of the ADFS server CRM uses for authentication.</summary>
	/// <param name="url" type="String">The Url of the CRM On Premise (IFD) organization (https://org.domain.com).</param>
	/// <returns type="String">The ADFS server url.</returns>
	GetADFS = function (url) {
		var adfsUrl = null;
		var req = new XMLHttpRequest();
		req.open("GET", url + "/XrmServices/2011/Organization.svc?wsdl=wsdl0", false);
		req.setRequestHeader("Connection", "Keep-Alive");
		req.setRequestHeader("Content-Type", "application/soap+xml; charset=UTF-8");
		req.onreadystatechange = function () {
			if (req.readyState === 4) {
				if (req.status === 200) {
					adfsUrl = req.responseXML.getElementsByTagNameNS("http://schemas.microsoft.com/xrm/2011/Contracts/Services","Identifier")[0].textContent
				}
			}
		};
		req.send();
		return adfsUrl.replace("http://", "https://");
	};

	/// <summary>Creates a GUID.</summary>
	/// <returns type="String">GUID.</returns>
	CreateGuid = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};

}