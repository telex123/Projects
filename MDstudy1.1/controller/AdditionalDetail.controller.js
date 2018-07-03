sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function(Controller, JSONModel, MessageToast, History) {
	"use strict";

	return Controller.extend("MDstudy.controller.AdditionalDetail", {

		_onObjectMatched: function(oEvent) {
			var name = oEvent.getParameter("arguments").username;
			this.getView().byId("title3").setTitle(name);

			var that = this; // ajax request 

			var request = $.ajax({
				url: "/northwind/V2/Northwind/Northwind.svc/Employees?$filter=FirstName eq '" + name + "'",
				//	url: "/northwind/V2/Northwind/Northwind.svc/Employees",
				type: "GET",
				dataType: "json",
				async: true,
				header: {
					contentType: "application/json",
					accept: "application/json"
				}
			});

			request.done(function(data) {
				that.byId("username").setText(data.d.results[0].FirstName);
				that.byId("usersurname").setText(data.d.results[0].LastName);
				that.byId("country").setText(data.d.results[0].Country);
				that.byId("region").setText(data.d.results[0].Region);
				that.byId("city").setText(data.d.results[0].City);
				that.byId("address").setText(data.d.results[0].Address);
				that.byId("phone").setText(data.d.results[0].HomePhone);

				if (!data.d.results[0].Region) {
					that.byId("region").setText("wrong region").addStyleClass("testclass");

				} else {
					that.byId("region").removeStyleClass("testclass");
				}

				var jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setData(data.d.results);
				that.byId("tableInform").setModel(jsonModel);
			});

			// var request1 = $.ajax({
			// 	url: "/northwind/V2/Northwind/Northwind.svc/Employees?$filter=FirstName eq '" + name + "'",
			// //	url: "/northwind/V2/Northwind/Northwind.svc/Employees",
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
			// 	that.byId("tableInform").setModel(jsonModel);
			// });
		},

		onInit: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("additionalDetail").attachPatternMatched(this._onObjectMatched, this);
		},

		sound: function() {
			MessageToast.show("Wuf");
			var audio = new Audio();
			audio.src = "/sound/wuf.mp3";
			audio.play();
		},

		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail", {}, true);
			}
		}

	});
});