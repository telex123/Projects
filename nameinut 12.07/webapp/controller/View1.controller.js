sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History"
	],

	function(Controller, MessageToast, History) {
		"use strict";

		var ViewController = Controller.extend("nameInput.controller.View1", {
			checkInput: function(oEvent) {
				//	console.log(abc);
			},
			page2: function(oEvent) {
				//передача данных из файла 
				var model = this.getView().getModel("users");
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(model));
				sap.ui.getCore().getModel().setData(model.getData());
				//
				var lol = this.getView().byId("name").getValue();
				var knopka = this.getView().byId("but2").getText();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view2", {
					invoicePath: lol,
					invo: knopka
				});

			},

			page3: function(oEvent) {

				// var lol = this.getView().byId("name").getValue();
				// var knopka = this.getView().byId("but2").getText();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view3");

			},
			
			page4:function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view4");
			},
			
			page5:function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view5");
			},

			check: function(oEvent) {
				var value = this.getView().byId("ageinput").getValue();

				var parser = parseInt(value, 10);
				MessageToast.show(parser);

				// if (parser >= 18) {
				// 	MessageToast.show("o, tebe uze " + parser + " idi za buhlom");

				// } else {
				// 	MessageToast.show("tebe " + parser + " let? vali otsuda");
				// }
				
				
				if (parser >= 18) {
					MessageToast.show("o, tebe uze " + parser + " idi za buhlom");
				}
				else if (parser <17) {
					MessageToast.show("tebe " + parser + " let? vali otsuda");
				}
				else {
						MessageToast.show("vali otsuda");
				}
				
				

			},

			onPress: function(evt) {

				// if  (!document.getElementById("name").value)
				if (!this.getView().byId("name").getValue("")) { //check to empty input
					MessageToast.show("Sorry, but this input is empty");
				} else {
					MessageToast.show(this.getView().byId("name").getValue() + ",Thanks to use this servisse ! " + " The size of your name: " + this.getView()
						.byId("name").getValue().length); // input count

				}

			}.bind(this)
		});
		return ViewController;
	}
);