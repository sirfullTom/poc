import {BusinessEntity} from './businessEntity';

export class SoapXmlParser {
	constructor() {
	    console.log("SoapXmlParser I'm alive!");
	}
	
    /// IE9/10 and Chrome, Firefox, support "textContent" and IE8 using "text"
	getNodeText(node) {
	    return node.text !== undefined ? node.text : node.textContent;
	}

    // get a single child node that matches the specified name.
	getChildNode(xmlNode, nodeName) {

	    var childNode;

	    for (var i = 0, max = xmlNode.childNodes.length; i < max; i++) {

	        childNode = xmlNode.childNodes[i];

	        if (childNode.nodeName === nodeName) {
	            return childNode;
	        }
	    }
	}

    // Get the attribute regardless of the namespace
	getAttribute(xmlNode, attrName) {

	    var attr = null;

	    for (var i = 0; i < xmlNode.attributes.length; i++) {

	        attr = xmlNode.attributes[i];

	        if (attr.name === attrName) {
	            return attr.value;
	        }
	    }
	}

    // retrievs the text-value of the expression
	getChildNodeText(xml, xpathExpression) {
	    return this.getNodeText(this.getChildNode(xml, xpathExpression));
	}

    // injects the paging-cookie & page-count
	setPagingDetails(fetchxml, pageNumber, pagingCookie) {
	    var serializer = new XMLSerializer(),
			parser = new DOMParser(),
			fetchDoc = parser.parseFromString(fetchxml, 'text/xml'),
			fetchElem = fetchDoc.getElementsByTagName('fetch')[0];

	    fetchElem.setAttribute('page', pageNumber);
	    fetchElem.setAttribute('paging-cookie', pagingCookie);

	    return serializer.serializeToString(fetchDoc);
	}

    // parses a date-string in ISO-format into a date-object
	dateObjectFromUTCString(utcString) {
	    var s = utcString.split(/\D/);
	    return new Date(Date.UTC(+s[0], --s[1], +s[2], +s[3], +s[4], +s[5], 0));
	}

    // extracts the error message generated by the Dynamics CRM server
	getSoapError(soapXmlObject) {

	    var bodyNode, faultNode, faultStringNode;

	    try {
	        bodyNode = soapXmlObject.lastChild.firstChild;
	        faultNode = this.getChildNode(bodyNode, 's:Fault');
	        faultStringNode = this.getChildNode(faultNode, 'faultstring');

	        return this.getNodeText(faultStringNode);
	    }
	    catch (e) {
	        return "An error occurred when parsing the error returned from CRM server: " + e.message;
	    }
	}

    // extracts the entity-name, totalrecord count, etc.
    // form the entity-collection xml-node
	getEntityCollectionDetails(entityCollectionNode) {

	    var entityName, moreRecords, pagingCookie,
			totalRecordCount, entitiesNode, collectionChildNode;

	    // Try to get all child nodes in one pass
	    for (var m = 0; m < entityCollectionNode.childNodes.length; m++) {

	        collectionChildNode = entityCollectionNode.childNodes[m];

	        switch (collectionChildNode.nodeName) {

	            case "a:EntityName":
	                entityName = this.getNodeText(collectionChildNode);
	                break;
	            case "a:MoreRecords":
	                moreRecords = this.getNodeText(collectionChildNode) === "true";
	                break;
	            case "a:PagingCookie":
	                pagingCookie = this.getNodeText(collectionChildNode);
	                break;
	            case "a:TotalRecordCount":
	                totalRecordCount = parseInt(this.getNodeText(collectionChildNode), 10);
	                break;
	            case "a:Entities":
	                entitiesNode = collectionChildNode;
	                break;
	        }
	    }

	    return {
	        entityName: entityName,
	        moreRecords: moreRecords,
	        pagingCookie: pagingCookie,
	        totalRecordCount: totalRecordCount
	    };
	}

    // parses "Attribute" nodes of the SOAP-response
	parseAttibutes(attributesNode) {

	    var typedAttrSet = {},
			attrNode, key, type, value;

	    for (var i = 0, max = attributesNode.childNodes.length; i < max; i++) {

	        attrNode = attributesNode.childNodes[i];

	        // Establish the key for the attribute
	        key = this.getChildNodeText(attrNode, 'c:key');
	        value = this.getChildNode(attrNode, 'c:value');
	        type = this.getAttribute(value, 'i:type');

	        // populate the object
	        typedAttrSet[key] = this.xmlNodeToAttributeObject(type, value);
	    }

	    return typedAttrSet;
	}

    // Parses a single xml-node -> transforms into BusinessEntity
	parseSingleEntityNode(entityNode) {
	    var entity = new BusinessEntity(),
			childSet, item, key, value;

	    entity.Id = this.getChildNodeText(entityNode, 'b:Id');
	    entity.attributes = this.parseAttibutes(this.getChildNode(entityNode, 'b:Attributes'));
	    entity.logicalName = this.getChildNodeText(entityNode, 'b:LogicalName');

	    // parse the formated values
	    childSet = this.getChildNode(entityNode, 'b:FormattedValues').childNodes;

	    for (var i = 0, max = childSet.length; i < max; i++) {

	        item = childSet[i];
	        key = this.getChildNodeText(item, 'c:key');
	        value = this.getChildNodeText(item, 'c:value');

	        entity.attributes[key].formattedValue = value;
	    }

	    return entity;
	}

    // get a list of entities from an attr of type 'EntityCollection'
    // e.g. 'Party Lists'
	getEntityCollection(entityCollectionNode) {

	    var entitiesNode = this.getChildNode(entityCollectionNode, 'b:Entities').childNodes,
			collectionDetails = this.getEntityCollectionDetails(entityCollectionNode),
			entities = [];

	    for (var i = 0, max = entitiesNode.length; i < max; i++) {
	        entities.push(this.parseSingleEntityNode(entitiesNode[i]));
	    }

	    return {
	        entityName: collectionDetails.entityName,
	        moreRecords: collectionDetails.moreRecords,
	        pagingCookie: collectionDetails.pagingCookie,
	        totalRecordCount: collectionDetails.totalRecordCount,
	        entities: entities
	    };
	}

    // Converst the xml definiton into an attribute object.
    // The joined attributes are evaluated via a recursive call of this function
	xmlNodeToAttributeObject(type, xmlnode) {

	    var attr = {
	        'type': type
	    };

	    switch (type) {

	        case "b:OptionSetValue":
	            attr.value = parseInt(this.getNodeText(xmlnode), 10);
	            break;

	        case "b:EntityReference":
	            attr.guid = this.getChildNodeText(xmlnode, 'b:Id');
	            attr.name = this.getChildNodeText(xmlnode, 'b:Name');
	            attr.logicalName = this.getChildNodeText(xmlnode, 'b:LogicalName');
	            break;

	        case "b:EntityCollection":
	            attr.value = this.getEntityCollection(xmlnode);
	            break;

	        case "b:Money":
	            attr.value = parseFloat(this.getNodeText(xmlnode), 10);
	            break;

	        case "b:AliasedValue":

	            var aliasValue = this.getChildNode(xmlnode, 'b:Value'),
					aliasType = this.getAttribute(aliasValue, 'i:type');

	            // recursive call
	            attr = this.xmlNodeToAttributeObject(aliasType, aliasValue);
	            break;

	        case 'd:int':
	            attr.value = parseInt(this.getNodeText(xmlnode), 10);
	            break;

	        case 'd:decimal':
	            attr.value = parseFloat(this.getNodeText(xmlnode));
	            break;

	        case 'd:dateTime':
	            attr.value = this.dateObjectFromUTCString(this.getNodeText(xmlnode));
	            break;

	        case 'd:boolean':
	            attr.value = (this.getNodeText(xmlnode) !== 'true') ? false : true;
	            break;

	        default:
	            attr.value = this.getNodeText(xmlnode);
	            break;
	    }

	    return attr;
	}

	findFirstKeyValue(responseXML, keyName){
	    var results = responseXML.querySelectorAll("key");
	    for(var i=0; i<results.length; i++){
	        if(results[i].childNodes[0].nodeValue == keyName){
	            return results[i].parentNode.childNodes[1].childNodes[0].nodeValue
	        }
	    }
	    return null;
	}

    // converts the response to a result-object that contains the
    // entities, pagaingcookie...
	getFetchResult(responseXmlObject) {

	    var executeResult = responseXmlObject.firstChild.lastChild.firstChild.firstChild,
			resultsNode = this.getChildNode(executeResult, 'b:Results'),
			entityCollectionNode = this.getChildNode(resultsNode.firstChild, 'c:value');

	    return this.getEntityCollection(entityCollectionNode);
	}

	getRetrieveResult(responseXmlObject) {

	    var executeResult = responseXmlObject.firstChild.lastChild.firstChild.firstChild,
				resultsNode = this.getChildNode(executeResult, 'b:Results'),
				singleEntityNode = this.getChildNode(resultsNode.firstChild, 'c:value');

	    return this.parseSingleEntityNode(singleEntityNode);
	}



}