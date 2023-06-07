/* Magic Mirror
 * Module: mmm-toggle-by-mqtt
 * Repository URL: https://github.com/moejetz/mmm-toggle-by-mqtt
 *
 * By Moritz Kraus
 * MIT Licensed.
 */

Module.register('mmm-toggle-by-mqtt', {

	defaults: {
		socketNotificationKey: 'mmm-toggle-by-mqtt-notification-key',
		mqttTopic: 'mmmToggleByMqtt',
		mqttHost: "mqtt://localhost",
		mqttUsername: null,
		mqttPassword: null,
	},

	command: "",
	topic: undefined,

	getScripts: function() {
		return [
			'modules/' + this.name + '/js/jquery.js'
		];
	},

	// Initialize bidirectional node_helper communication
	start: function() {
		this.sendSocketNotification(this.config.socketNotificationKey, this.config);
	},


	// Socket notification callback from node_helper.js
	socketNotificationReceived: function (notification, payload) {
		if(notification === this.config.socketNotificationKey) {
			this.command = payload.command;
			this.topic = payload.topic;
			this.mqttUsername = payload.username;
			this.mqttPassword = payload.password;
			this.updateDom();
		}
	},

	// MagicMirror2 function to update the DOM.
	// Used to display/hide the complete body
	getDom: function() {

		var self = this;

		if(self.topic === this.config.mqttTopic) {
			console.log(this.name + ': MQTT command received: ', self.command);

			// Check to see if this is a module-specific request
			const splittedMessage = self.command.split('=');
			
			if(splittedMessage.length > 1) {
					const moduleName = splittedMessage[0].trim();
					const state = splittedMessage[1].trim();

				MM.getModules()
					.exceptModule(this)
					.enumerate(function (module) {
						if(module.name !== moduleName) return;

						if(state === 'show') {
							module.show(1000);
						} else if (state === 'hide') {
							module.hide(1000);
						}
					});
			}

			if(self.command === 'show') {
			console.log(this.name + ': turn display modules ON...');
			$('body').fadeIn(1000);

			} else if(self.command === 'hide') {
				console.log(this.name + 'turn display modules OFF...');
				$('body').fadeOut(1000);
			}
		}

		return document.createElement('div');
	}
});
