sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel"
	],

	function(Controller, MessageToast, History, JSONModel) {
		"use strict";

		var ViewController = Controller.extend("nameInput.controller.View4", {

			onInit: function(oEvent) {

				var that = this; // ajax request 

				var request = $.ajax({
					//url: "/northwind/V2/Northwind/Northwind.svc/Products?$filter=ProductName eq '" + name + "'",
					url: "/northwind/V2/Northwind/Northwind.svc/Products",
					//	url: "/northwind/V2/Northwind/Northwind.svc/Products?$filter=SupplierID",
					type: "GET",
					dataType: "json",
					async: true,
					header: {
						contentType: "application/json",
						accept: "application/json"
					}
				});

				request.done(function(data) {
					
					var massiv = data.d.results;
					//remove duplicates
					var a = [];
					var b = [];

					for (var i = 0; i < massiv.length; i++) {
						if (a.indexOf(massiv[i].SupplierID) === -1) {
							a.push(massiv[i].SupplierID);
						}
					}
					for (var j = 0; j < a.length; j++) {
						var object = {};
						object.SupplierID = a[j];
						b.push(object);
					}

					var jsonModel = new sap.ui.model.json.JSONModel();
					jsonModel.setData(b);
					that.byId("comboPSupplierID").setModel(jsonModel);
				});

				// var request1 = $.ajax({
				// 	url: "/northwind/V2/Northwind/Northwind.svc/Suppliers",
				// 	//	url: "/northwind/V2/Northwind/Northwind.svc/Products?$filter=SupplierID",
				// 	type: "GET",
				// 	dataType: "json",
				// 	async: true,
				// 	header: {
				// 		contentType: "application/json",
				// 		accept: "application/json"
				// 	}
				// });

				// request1.done(function(data) {

				// 	var jsonModel = new sap.ui.model.json.JSONModel();
				// 	jsonModel.setData(data.d.results);
				// 	that.byId("suppliersCity").setModel(jsonModel);
				// });
				

			},
			
			selectID:function(oEvent){
				
			// 	var view = sap.ui.getCore();
			// if (oEvent.getSource().getSelectedItem()) {
			
			// 	view.byId("suppliersCity").setEnabled(true);
			// } else {
			// 	view.byId("suppliersCity").setEnabled(false);
			// 	view.byId("suppliersCity").clearSelection();
			// }
			
			
			var	that = this;
			
			var selectedID = oEvent.getSource().getSelectedItem().getProperty("text");
			//	MessageToast.show(selectedID);
				var request3 = $.ajax({
					url: "/northwind/V2/Northwind/Northwind.svc/Suppliers?$filter=SupplierID eq " + selectedID,
				//	url: "/northwind/V2/Northwind/Northwind.svc/Suppliers",
					type: "GET",
					dataType: "json",
					async: true,
					header: {
						contentType: "application/json",
						accept: "application/json"
					}
				});
				
				
				request3.done(function(data) {

					var massiv1 = data.d.results;
					var jsonModel = new sap.ui.model.json.JSONModel();
					jsonModel.setData(massiv1);
					that.getView().byId("suppliersCity").setModel(jsonModel);
				});
			
			},

			select: function(oEvent) {
				var that = this;
				//	var view = this.getView();
				var selectedCity = oEvent.getSource().getSelectedItem().getProperty("text");
				MessageToast.show(selectedCity);

				var request2 = $.ajax({
					url: "/northwind/V2/Northwind/Northwind.svc/Orders?$filter=ShipCity eq '" + selectedCity + "'",
					type: "GET",
					dataType: "json",
					async: true,
					header: {
						contentType: "application/json",
						accept: "application/json"
					}
				});

				request2.done(function(data) {

					var massiv1 = data.d.results;

					var a = [];
					var b = [];

					for (var i = 0; i < massiv1.length; i++) {
						if (a.indexOf(massiv1[i].CustomerID) === -1) {
							a.push(massiv1[i].CustomerID);
						}
					}
					for (var j = 0; j < a.length; j++) {
						var object = {};
						object.CustomerID = a[j];
						b.push(object);
					}
					var jsonModel = new sap.ui.model.json.JSONModel();
					jsonModel.setData(b);
					that.getView().byId("custometID").setModel(jsonModel);
				});

			},

			onNavBack: function() {

				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view1", {}, true);
				}
			}

		});
		return ViewController;
	}
);