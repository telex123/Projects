sap.ui.define(function() {
	"use strict";

	var formatter = {

		status: function(sStatus,heh) {
			
			// if(heh === 0){
			// 	heh = "Out of Stock";
			// }
			
			var red = "Out of Stock";
			var that = this;
			
			if (sStatus === 0) {
				
				return "Error";
			}
			
			// if (sStatus === "Error") {
			// 	return red;
			// }

			else if (sStatus <= 20) {
				return "Warning";
			} else if (sStatus >= 21) {
				return "Success";
			}
		},
		
		checkStock: function(value) {
			if (value === 0) {
				return "Out of Stock";
			} else {
				return value;
			}
		},
		checkOrder:function(value){
			if (value === 0) {
				return "Out of Stock";
			} else {
				return value;
			}
		}
	};
	return formatter;

}, /* bExport= */ true);