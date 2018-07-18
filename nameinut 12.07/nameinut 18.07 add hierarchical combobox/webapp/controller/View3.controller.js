sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/routing/History",
			"sap/ui/model/json/JSONModel"
	],

	function(Controller, MessageToast, History, JSONModel) {
		"use strict";

		var ViewController = Controller.extend("nameInput.controller.View3", {

			onNavBack: function() {

				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view1", {}, true);
				}
				// $.ajax({    ajax zapros primer
				// 	type:"GET",
				// 	url:"",
				// 	dataType:"json"
				// 	});
			},

			ajaxtest: function() {

				$.ajax({
					url: "model/users.json",
					type: "GET",
					dataType: "json",
					header: {
						contentType: "application/json",
						accept: "application/json"
					},
					success: function(data) {
						console.log(data);
						// MessageToast.show(data.value[0].username);
						// for(var i=0; i<data.value[i].username.length; i++){
						// alert(data.value[i].username);
						MessageToast.show(data.value[0].username);
					}
				});
			},

			onAddord: function() {
				
				var oModel = new JSONModel();
			
				var vii = this.getView();
			
			
				$.ajax({
					url: "/northwind/V2/Northwind/Northwind.svc/Orders",
					type: "GET",
					headers: {
						"content-Type": "application/json",
						"accept": "application/json"
					},
					success: function(data) {
						console.log(data);
						//
							var ogo = data.value;
							oModel.setData(ogo);
						for (var i = 0; i < data.d.results[i].OrderID; i++) {
							MessageToast.show(data.d.results[i].OrderID);    
							// oModel.setData({
							// 	value1:[{
							// 		OrderID : data.d.results[i].OrderID
									
							// 	}]
							// });
						 //     	vii.byId("table2").setModel(oModel); 
							
							// var ogo = data.value;
							// oModel.setData(ogo);
			

							  vii.getModel("oModel").getProperty("/value1").push({
								"OrdID": data.d.results[i].OrderID
							});
								vii.byId("table2").setModel(oModel);

						}

						//	 MessageToast.show("saccess"+data.d.results[1].OrderID);
					}.bind(this)
				});

			},

			ajaxpost: function() {

				//ne rabotaet t.k. na localke mozno tolko izat' GET 
				$.ajax({

					url: "model/users.json",
					type: "POST",
					dataType: "json",
					header: {
						contentType: "application/json; charset=utf-8",
						accept: "application/json"
					},

					data: JSON.stringify({

						"username": "Usertest",
						"usersurname": "surnametest",
						"usercity": "Majami beatch",
						"userpackage": "ogogogo Pack"

					}),
					success: function(data) {
						MessageToast.show("data" + data);
					}

				});

			},

			norajax: function() {

				$.ajax({
					url: "/northwind/V2/Northwind/Northwind.svc/Employees",
					//	url: "localService/metadata.xml",
					type: "GET",
					headers: {
						"content-Type": "application/json",
						"accept": "application/json"
					},
					success: function(data1) {
						console.log(data1);
						//	MessageToast.show(data1.value[0].username);
					}
				});

			}

		});
		return ViewController;
	}
);