sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";
	
	// company: {
	// 	name: "serg",
	// 	info: {
	// 		 employees: 1
	// 	}
	// }
	
	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
	oModel.setData({
    firstName: "Peter",
    lastName: "Pan"
	});
			return oModel;
		}

	};
});