sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device" //,
	//"nameInput/model/models"
], function(UIComponent, Device) {
	"use strict";

	return UIComponent.extend("nameInput.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});