sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel",
		"nameInput/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/Sorter",
		"sap/ui/core/util/Export",
		"sap/ui/core/util/ExportTypeCSV"

	],

	function(Controller, MessageToast, History, JSONModel, formatter, Filter, Sorter, Export, ExportTypeCSV) {
		"use strict";

		var ViewController = Controller.extend("nameInput.controller.View5", {

			formatter: formatter,

			onNavBack: function() {

				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view1", {}, true);
				}
			},

			onInit: function(oEvent) {

			},

			sortButton: function() {
				//	MessageToast.show("yo");
				// var vii = this.getView();
				// var oList = this.getView().byId("liist");

				// 	for (var i = 0; i < vii.byId("liist").getAggregation("items").length; i++){
				// 		console.log(vii.byId("liist").getAggregation("items")[i].getProperty("number"));

				// 	}

				var oList = this.getView().byId("liist");
				var oItems = oList.getBinding("items");
				var aSorter = oItems.aSorters[0];
				var oDescending = aSorter.bDescending;
				var oSorter = new Sorter("UnitPrice", !oDescending);
				oItems.sort(oSorter);
				if (!oDescending) {
					MessageToast.show("Descending");
				} else {
					MessageToast.show("Ascending");
				}

			},

			onDataExport: sap.m.Table.prototype.exportData || function(oEvent) {

				var oExport = new Export({

					// Type that will be used to generate the content. Own ExportType's can be created to support other formats
					exportType: new ExportTypeCSV({
						separatorChar: " "
					}),

					// Pass in the model created above
					models: this.getView().getModel(),

					// binding information for the rows aggregation
					rows: {
						path: "/Products"
					},

					// column definitions with column name and binding info for the content

					columns: [{
						name: "ProductName",
						template: {
							content: "{ProductName}"
						}
					}, {
						name: "UnitPrice",
						template: {
							content: "{UnitPrice}"
						}
					}]
				});

				// download exported file
				oExport.saveFile().catch(function(oError) {
					MessageToast.show("Error when downloading data. Browser might not be supported!\n\n" + oError);
				}).then(function() {
					oExport.destroy();
				});

			}

		});
		return ViewController;
	}
);