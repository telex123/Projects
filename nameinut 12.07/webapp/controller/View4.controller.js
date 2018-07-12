sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel"
	],

	function(Controller, MessageToast, History, JSONModel) {
		"use strict";

		var ViewController = Controller.extend("nameInput.controller.View4", {
			
			testik:function(){
				
			//	var i = 0;
				var vii = this.getView();
			for (var i = 0; i < vii.byId("table4").getAggregation("items").length; i++){
			//	console.log(vii.byId("table4").getAggregation("items")[i].getAggregation("cells")[3].getProperty("text"));
			if(vii.byId("table4").getAggregation("items")[i].getAggregation("cells")[3].getProperty("text") === "0"){
				//MessageToast.show("OOUU");
				vii.byId("table4").getAggregation("items")[i].getAggregation("cells")[3].setText("Out of Stock").addStyleClass("redclass");
			}
			
			if(vii.byId("table4").getAggregation("items")[i].getAggregation("cells")[3].getProperty("text") >= 50){
				//MessageToast.show("OOUU");
				vii.byId("table4").getAggregation("items")[i].getAggregation("cells")[3].setText("bolwe ili rovno 50").addStyleClass("redclass");
			}
			
			}
			//	if()
			},
		
			
			onInit:function(oEvent){
				var	that = this;
			 var vii = this.getView();
				// vii.byId("table4");
				// console.log("hi");
				// console.log(vii.byId("table4"));
				//	console.log(vii.byId("table4").f.getParent()[0].getProperty("title"));
			//	console.log(vii.byId("table4").f.mAggregations.columns[0].mAggregations.cells[4].mProperties.number)
			//	console.log(vii.byId("table4").mAggregations.items["0"].mAggregations.cells[4].mProperties.number);
		//	console.log(vii.byId("table4").getAggregation("items")["4"].getAggregation("cells")[4].getProperty("number"));
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