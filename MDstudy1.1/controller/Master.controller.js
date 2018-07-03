sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("MDstudy.controller.Master", {

		onInit: function() {
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 	oRouter.getRoute("master").attachPatternMatched(this._onObjectMatched, this);
			/*var that = this; // ajax request 

			var request = $.ajax({
				//url: "/northwind/V2/Northwind/Northwind.svc/Products?$filter=ProductName eq '" + name + "'",
				url: "/northwind/V2/Northwind/Northwind.svc/Products",
				type: "GET",
				dataType: "json",
				async: true,
				header: {
					contentType: "application/json",
					accept: "application/json"
				}
			});

			request.done(function(data) {
				// $.each(data.d.results, function(key, prodname) {

				// 		console.log(prodname.ProductName);

				// 	var model = new JSONModel();
				// 	model.setData({
				// 		values: [{
				// 			productname: prodname.ProductName
				// 		}]
				// 	});
				// 	view.setModel(model);
				// 	view.bindAggregation("items", {
				// 		path: "/values",
				// 		template: oTitle
				// 	});
				// 	view.getModel().refresh();

				// });
				var jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setData(data.d.results);
				that.byId("masterList").setModel(jsonModel);
			});*/
		},

		blood: function() {
			//var color = this.getView().byId("master");
			// document.getElementById("master").style.backgroundColor = "red";
			//	$.getElementById("master").style.backgroundColor = "red";

		},

		onSelectionChange: function(oEvent) {
			//	var that = this.byId("detailList");
			//var oCore = sap.ui.getCore().getView();
			//	var vii = this.getView();
			var name = oEvent.getSource().getSelectedItem().getProperty("title");
		//	MessageToast.show(name);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				invoicePath: name
			});

			//var oTemplate = new sap.m.List();
			/*	var oTemplate = new sap.m.StandardListItem({
					title: "{usertitle}"
				});
			*/

			// var oTemplate = new sap.m.ColumnListItem({
			// 	cells: [new sap.m.Text({
			// 		text: "{usertitle}"
			// 	})]
			// });

		}
	});
});