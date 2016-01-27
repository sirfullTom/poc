
// Type: JavaScript Implementation of the Entity Class
export class BusinessEntity {
	constructor() {
	    console.log("BusinessEntity I'm alive!");
	}
	
	Id = null;
	logicalName = null;
	attributes = {};

    // Getter for the attributes
    // E.g.: entity.getValue('accountid') or contact.getValue('parentaccountid', 'name')
	getValue(attrname, opt_property) {
	    var attr = this.attributes[attrname];
	    if (attr) {
	        var attrType = attr.type;
	        switch (attrType) {
	            case 'b:EntityReference':
	                return (opt_property !== undefined) ? attr[opt_property] : attr.guid;

	            case 'b:OptionSetValue':
	                return (opt_property !== undefined) ? attr[opt_property] : attr.value;

	            default:
	                return attr.value;
	        }
	    }

	    return null;
	};
}