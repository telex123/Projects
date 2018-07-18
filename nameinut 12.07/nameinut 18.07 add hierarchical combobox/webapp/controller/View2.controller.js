sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageBox",
		"sap/m/Dialog",
		"sap/m/Button",
		"sap/m/Text",
		"sap/m/TextArea",
		"sap/m/Input"


	],

	function(Controller, MessageToast, History, JSONModel, MessageBox, Dialog, Button, Text, TextArea, Input) {
		"use strict";

		var ViewController2 = Controller.extend("nameInput.controller.View2", {

			dataexample: function() {

				var ky = new XMLHttpRequest();
				//	ky.open('get','metadata.xml', false);
				//	ky.open('get','model/countriesCollection.json', false);
				ky.open("get", "localService/metadata.xml", false);
				ky.send();
				//MessageToast.show( ky.responseText );
				alert(ky.responseText);

			},

			onInit: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("view2").attachPatternMatched(this._onObjectMatched, this);

				// correct
				var data = new JSONModel();
				data.setData({
					values: [{
						Color: "red"
					}]
				});
				this.getView().byId("firstread").setModel(data);

				//для отображения
				var oTable = this.getView().byId("table");
				oTable.setModel(sap.ui.getCore().getModel());

			},

			onDelete: function() {
				//polu4itj indeks modeli i udalitj

				var dialog = new Dialog({
					title: "Warning",
					type: "Message",
					state: "Warning",
					
					content: [
						new Text({
							text: "Are you sure about that ?"
						}),
						new sap.m.Image({  
							src: "view/ceenaface.png",
							width: "200px",
							height: "200px"
						})
					],
					// content: new Text({
					// 	text: "Are you sure about that ?"
					// }),
					// content: new sap.m.Image({
					// 	width: 100,
					// 	height: 100,
					// 	scr:"view/ceenaface.png"
					//}),
					// content: new sap.m.Image([width], [height])([100], [100])
					// 	scr:"ceenaface.png"

					beginButton: new Button({
							text: "OK",
							press: function() {
								
							
								
								var oTable = this.getView().byId("table");
								var aSelectedItems = oTable.getSelectedItems();

								for (var i = 0; i < aSelectedItems.length; i++) {
									oTable.removeItem(aSelectedItems[i]);
									dialog.close();
									MessageToast.show("User deleted");
								}
								this.getView().byId("table").getModel().refresh();
							}.bind(this)
						} // 4to bi this.getView()  rabotal, ispulzuem .bind(this)
					),
					endButton: new Button({
						text: "Cancel",
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();

				// var oTable = this.getView().byId("table");
				//           var aSelectedItems = oTable.getSelectedItems();

				//           for(var i=0; i<aSelectedItems.length; i++){
				//             oTable.removeItem(aSelectedItems[i]);
				//              MessageToast.show("User deleted");
				//           }
				//	this.getView().byId("table").getModel().refresh();
			},

			onAdd: function() {

				var dialog2 = new Dialog({
					title: "Add user",
					type: "Message",
					//state: "Warning",
					content: [
						new Text({
							text: "Please, write some information about user:"
						}),
						new Input({
							placeholder: "User Name"
						}),
						new Input({
							placeholder: "User Surename"
						}),
						new Input({
							placeholder: "User city"
						}),
						new Input({
							placeholder: "User package"
						})

					],

					beginButton: new Button({
						text: "Add",
						press: function(oEvent) {

							// var sText1 = sap.ui.getCore().byId("inp1").getValue();
							// var sText2 = sap.ui.getCore().byId("inp2").getValue();
							// var sText3 = sap.ui.getCore().byId("inp3").getValue();
							// var sText4 = sap.ui.getCore().byId("inp4").getValue();

							this.getView().getModel("users").getProperty("/value").push({
								"username": oEvent.getSource().getParent().getContent()[1].getValue(),
								"usersurname": oEvent.getSource().getParent().getContent()[2].getValue(),
								"usercity": oEvent.getSource().getParent().getContent()[3].getValue(),
								"userpackage": oEvent.getSource().getParent().getContent()[4].getValue()
							});

							//	var opa = this.getView().byId("kek").getValue();

							//	this.getView().byId("kek").getValue();

							// this.getView().getModel("users").getProperty("/value").push({
							// 	"username": "{opa}",
							// 	"usersurname": "{inp2}",
							// 	"usercity": "{inp3}",
							// 	"userpackage": "{inp4}"
							// });
							// this.getView().byId("table").getModel().refresh();
							dialog2.close();
							MessageToast.show("User Added");
							this.getView().byId("table").getModel().refresh();
						}.bind(this)
					}),

					endButton: new Button({
						text: "Cancel",
						press: function() {
							dialog2.close();
						},
						afterClose: function() {
							dialog2.destroy();
						}
					})

				});

				// this.getView().getModel("users").getProperty("/value").push({
				// 	"username" : "",
				// 	"usersurname" : "",
				// 	"usercity" : "",
				// 	"userpackage" : ""
				//	});
				//	this.getView().byId("table").getModel().refresh(); //obnovlenie 4to bi otobrazitj dobavlennuju stroku
				dialog2.open();
			},

			_onObjectMatched: function(oEvent) {
				this.getView().byId("tit2").setTitle(oEvent.getParameter("arguments").invoicePath + oEvent.getParameter("arguments").invo);
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
			},

			list: function(oEvent) {
				MessageToast.show("yo");
				// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				// oRouter.navTo("employeeList");
			},

			test: function(oEvent) {
				//				console.log(oEvent);
			}
		});
		return ViewController2;
	}
);