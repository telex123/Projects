sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("Split.controller.View1", {

		onInit: function() {
			
		},

		productselect: function(oEvent) {

			var view = this.getView().byId("detailtable");
			//	var model = new JSONModel();
			var name = oEvent.getSource().getBindingContext().getProperty("ProductName");
			var oTable = this.byId("detailtable");

			// $.ajax({
			// 	url: "/northwind/V2/Northwind/Northwind.svc/Products",
			// 	type: "GET",
			// 	dataType: "json",
			// 	async: true,
			// 	header: {
			// 		contentType: "application/json",
			// 		accept: "application/json"
			// 	},
			// 	success: function(data) {
			// 		console.log(data);
			// 		MessageToast.show(data.d.results[0].ProductName);
			// 		//MessageToast.show(name);

			// 		//	var massiv = ["tom", "dandy"];
			// 		$.each(data.d.results, function(key, prodname) {
			// 				//	console.log(productname);
			// 				console.log(prodname);
			// 			}

			// 		);
			// 		// var productname = data.d.results().getSource().getSelectedItem().getProperty("ProductName");  
			// 		// var productname = data.d.results[0].ProductName;  
			// 		// model.setData({
			// 		// 	productname: productname
			// 		// });
			// 		// view.setModel(model);
			// 		// view.setModel(data);
			// 		// view.getModel().refresh();
			// 	}

			// });

			var oTemplate = new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
					text: "{productname}"
				}), new sap.m.Text({
					text: "{productid}"
				}), new sap.m.Text({
					text: "{unitprice}"
				}), new sap.m.Text({
					text: "{quantity}"
				})]
			});


			var request = $.ajax({
				url: "/northwind/V2/Northwind/Northwind.svc/Products?$filter=ProductName eq '" + name + "'",
				//	url: "/northwind/V2/Northwind/Northwind.svc/Products",
				type: "GET",
				dataType: "json",
				async: true,
				header: {
					contentType: "application/json",
					accept: "application/json"
				}
			});

			request.done(function(data) {
				$.each(data.d.results, function(key, prodname) {

					//	console.log(prodname.ProductName);

					if (prodname.ProductName === name) {
						//	MessageToast.show("Found!");
						var model = new JSONModel();
						model.setData({
							values: [{
								productname: prodname.ProductName,
								productid: prodname.ProductID,
								unitprice: prodname.UnitPrice,
								quantity: prodname.QuantityPerUnit
							}]
						});
						view.setModel(model);
						view.bindAggregation("items",{
							path:"/values",
							template: oTemplate
						});
						view.getModel().refresh();
						
					}
				});
				// items="{/values}"

			});

			request.fail(function(message) {
				MessageToast.show("No record found");
			});
			// var productname = ;
			// // var productid = ;
			// // var unitprice = ;
			// // var quantity = ;

			// 	var data = new JSONModel();
			// 	data.setData({
			// 		values: [{
			// 			productname: productname,
			// 			productid: productname,
			// 			unitprice:productname,
			// 			quantity:productname
			// 		}]
			// 	});  
			// view.setModel(data);
			// var oTable = this.getView().byId("detailtable");
			// oTable.setModel(data);
			// oTable.getModel().refresh();

		}

	});
});