sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Input",
	"sap/ui/comp/filterbar/FilterBar",
	"sap/ui/comp/filterbar/FilterGroupItem",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function(Controller, MessageToast, ValueHelpDialog, JSONModel, Dialog, Input, FilterBar, FilterGroupItem, ODataModel, Filter,
	FilterOperator) {
	"use strict";

	return Controller.extend("MultiInput.controller.Home", {

		onInit: function() {
			
		},

		test: function() {
			MessageToast.show("yo");
		},
		help: function() {

			var oView = this.getView();

			var oValueHelpDialog = new ValueHelpDialog({
				//basicSearchText: "wow",
				title: "Advanced search",
				supportMultiselect: false,
				supportRanges: false,
				supportRangesOnly: false,
				stretch: sap.ui.Device.system.phone,

				ok: function(oControlEvent) {

					//oValueHelpDialog.close();
				},

				cancel: function(oControlEvent) {

					oValueHelpDialog.close();
				},

				afterClose: function() {
					oValueHelpDialog.destroy();
				}

			});

			var oColModel = new JSONModel();
			oColModel.setData({
				cols: [{
					label: "First Name",
					template: "FirstName"
				}, {
					label: "Last Name",
					template: "LastName"
				}, {
					label: "County",
					template: "Country"
				}, {
					label: "Title",
					template: "Title"
				}, {
					label: "City",
					template: "City"
				}]
			});

			var oTable = oValueHelpDialog.getTable();
			oTable.setModel(oColModel, "columns");

			var oRowsModel = oView.getModel("");
			oTable.setModel(oRowsModel);
			oTable.bindRows("/Employees");
			//
			oValueHelpDialog.setModel(this.getView().getModel()); //interesting...
			//
			var oFilterBar = new FilterBar({
				advancedMode: true,
				filterBarExpanded: true,
				filterGroupItems: [new FilterGroupItem({
						groupName: "gn1",
						name: "n1",
						label: "First name",
						control: new sap.m.Input({
							type: "Text",
							placeholder: " ...",
							showSuggestion: true,
							startSuggestion: 3,
							suggestionItems: {
								path: "/Employees",
								template: new sap.ui.core.Item({
									text: "{FirstName}"
								})
							},
							suggest: function(oEvent) {}
						})
					}),
					new FilterGroupItem({
						groupName: "gnfd1",
						name: "fdn1",
						label: "Last name",
						control: new sap.m.Input({
							type: "Text",
							placeholder: " ...",
							showSuggestion: true,
							startSuggestion: 3,
							suggestionItems: {
								path: "/Employees",
								template: new sap.ui.core.Item({
									text: "{LastName}"
								})
							},
							suggest: function(oEvent) {
								//	MessageToast.show(this.getValue());
							}
						})
					})

					// new FilterGroupItem({
					// 	groupTitle: "Payer",
					// 	groupName: "gn1",
					// 	name: "n3",
					// 	label: "test",
					// 	control: new sap.m.ComboBox({
					// 		placeholder: "wow its test ...",
					// 		items: {
					// 			path: "/Employees",
					// 			template: new sap.ui.core.Item({
					// 				text: "{FirstName}"
					// 			})
					// 		}
					// 	})
					// })
				],

				search: function(oEvent) {
					//	MessageToast.show(arguments[0].getParameters().selectionSet[0].getValue() + " " + arguments[0].getParameters().selectionSet[1].getValue());

					this.f4filter = [];
					var fbFilters = [];
					fbFilters = oEvent.getParameter("selectionSet");
					//	MessageToast.show(fbFilters[0].getValue() + " " + fbFilters[1].getValue());

					if (fbFilters[0].getValue()) {
						var filterFirst = new Filter("FirstName", FilterOperator.EQ, fbFilters[0].getValue());
						this.f4filter.push(filterFirst);
					}

					if (fbFilters[1].getValue()) {
						var filterLast = new Filter("LastName", FilterOperator.EQ, fbFilters[1].getValue());
						this.f4filter.push(filterLast);
					}

					var oTableBillTo = oValueHelpDialog.getTable(),
						oJSONModel = new JSONModel(fbFilters);
					oTableBillTo.setModel(oJSONModel);

					var bindRows = function(results) {
						oTableBillTo.bindRows("/Employees");
					};

					oView.getModel().read(
						"/Employees?$format=json", {
							filters: this.f4filter,
							success: function(response) {
								fbFilters.Employees = response.results;
								bindRows(response.results);
							}
						}
					);

				}

			});
			oValueHelpDialog.setFilterBar(oFilterBar);

			oValueHelpDialog.open();
			//	oValueHelpDialog.update();

		}

	});
});