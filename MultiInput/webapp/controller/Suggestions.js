sap.ui.define([
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(ODataModel, Filter, FilterOperator) {
	"use strict";

	return {
		suggest: function(oEvent, filter, read) {
			var model = new ODataModel("/V2/Northwind/Northwind.svc/Employees"),
				fFilter = new Filter(filter, FilterOperator.EQ, oEvent.getSource().getValue());

			model.read(read, {
				filters: [fFilter]
			});

			oEvent.getSource().getBinding("suggestionItems").filter(fFilter);
		}

	};

});