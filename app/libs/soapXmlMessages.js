import {Utils} from './utils';

export class SoapXmlMessages {
    constructor() {
        console.log("SoapXmlMessages I'm alive!");
    }
	
    static getFetchMoreXml(fetchxml) {
        return [' <s:Body>',
                '  <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services">',
                '     <request i:type="b:RetrieveMultipleRequest" xmlns:b="http://schemas.microsoft.com/xrm/2011/Contracts" ',
                '         xmlns:i="http://www.w3.org/2001/XMLSchema-instance">',
                '             <b:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">',
                '             <b:KeyValuePairOfstringanyType>',
                '                 <c:key>Query</c:key>',
                '                 <c:value i:type="b:FetchExpression">',
                '                     <b:Query>',
                Utils.xmlEncode(fetchxml),
                '                     </b:Query>',
                '                 </c:value>',
                '             </b:KeyValuePairOfstringanyType>',
                '         </b:Parameters>',
                '         <b:RequestId i:nil="true"/>',
                '         <b:RequestName>RetrieveMultiple</b:RequestName>',
                '     </request>',
                ' </Execute>',
                '</s:Body>'].join('');
    }
    
    static getRetrieveXml(id, entityname, columns) {
        var requestColumns = columns.map(
            function(col){ return '<c:string>' + col + '</c:string>';
        }).join('');

        var requestBodyXml = [
            '<request i:type="a:RetrieveRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">',
            '	<a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">',
            '	  <a:KeyValuePairOfstringanyType>',
            '	    <b:key>Target</b:key>',
            '	    <b:value i:type="a:EntityReference">',
            '	      <a:Id>', id, '</a:Id>',
            '	      <a:LogicalName>', entityname, '</a:LogicalName>',
            '	      <a:Name i:nil="true" />',
            '	    </b:value>',
            '	  </a:KeyValuePairOfstringanyType>',
            '	  <a:KeyValuePairOfstringanyType>',
            '	    <b:key>ColumnSet</b:key>',
            '	    <b:value i:type="a:ColumnSet">',
            '	    <a:AllColumns>false</a:AllColumns>',
            '       <a:Columns xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">',
                        requestColumns,
            '       </a:Columns>',
            '	    </b:value>',
            '	  </a:KeyValuePairOfstringanyType>',
            '	</a:Parameters>',
            '	<a:RequestId i:nil="true" />',
            '	<a:RequestName>Retrieve</a:RequestName>',
            '</request>'
        ].join('');

        return SoapXmlMessages.buildExecuteRequest(requestBodyXml);
    }

    static getWhoAmIXml(){
        var requestBodyXml = [
           '<request i:type="c:WhoAmIRequest" xmlns:b="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:c="http://schemas.microsoft.com/crm/2011/Contracts">',
           '	<b:Parameters xmlns:d="http://schemas.datacontract.org/2004/07/System.Collections.Generic"/>',
           '	<b:RequestId i:nil="true"/>',
           '	<b:RequestName>WhoAmI</b:RequestName>',
           '</request>'
        ].join('');
        return SoapXmlMessages.buildExecuteRequest(requestBodyXml);
    }

    static buildExecuteRequest(soapRequestBodyXml) {
        return ['<s:Body>',
                '  <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">',
                     soapRequestBodyXml,
                '  </Execute>',
                '</s:Body>',
        ].join('');
    }
}