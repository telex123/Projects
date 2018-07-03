sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("MDstudy.controller.Detail", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function(oEvent) {
			var name = oEvent.getParameter("arguments").invoicePath;
			this.getView().byId("title2").setTitle(name);
			//this.getView().byId("detailtable").getHeaderToolbar().getContent()[0].setProperty("text", name);
			var that = this;

			var request = $.ajax({
				//	url: "/northwind/V2/Northwind/Northwind.svc/Employees?$filter=FirstName eq '" + name + "'",
				url: "/northwind/V2/Northwind/Northwind.svc/Employees?$filter=FirstName eq '" + name + "'",
				type: "GET",
				dataType: "json",
				header: {
					contentType: "application/json",
					accept: "application/json"
				}
			});

			request.done(function(data) {
				$.each(data.d.results, function(key, prodname) {
					if (prodname.FirstName === name) {
						//	console.log(that);
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData({
							inform: [{
								userFirstName: prodname.FirstName,
								userLastName: prodname.City,
								userCity: prodname.LastName
							}]
						});

						var oTemplate = new sap.m.StandardListItem({
							title: "{userFirstName}",
							info: "{userCity}",
							description: "{userLastName}"
						});

						that.getView().byId("detailtable").setModel(oModel);
						that.getView().byId("detailtable").bindAggregation("items", {
							path: "/inform",
							template: oTemplate
						});
						that.getView().getModel().refresh();
					}
				});
			});
			request.fail(function(message) {
				MessageToast.show("No record found");
			});
		},

		onSelectionChangedetail: function(oEvent) {
			// var name = oEvent.getParameter("arguments").invoicePath;
			// this.getView().byId("title3").setTitle(name);
			// this.getView().byId("detailtable").getHeaderToolbar().getContent()[0].setProperty("text", name);
			var name = oEvent.getSource().getSelectedItem().getProperty("title");
			
			// var that = this; // ajax request 
			// 	var request = $.ajax({
			// 		url: "/northwind/V2/Northwind/Northwind.svc/Employees?$filter=FirstName eq '" + name + "'",
			// 	//	url: "/northwind/V2/Northwind/Northwind.svc/Employees",
			// 		type: "GET",
			// 		dataType: "json",
			// 		async: true,
			// 		header: {
			// 			contentType: "application/json",
			// 			accept: "application/json"
			// 		}
			// 	});

			// 	request.done(function(data) {

			// 		var jsonModel = new sap.ui.model.json.JSONModel();
			// 		jsonModel.setData(data.d.results);
			// 		that.byId("userInfoForm").setModel(jsonModel);
			// 	});
			
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("additionalDetail", {
				username: name
			});

		}

	});
});