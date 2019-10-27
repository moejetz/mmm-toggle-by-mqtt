/* Magic Mirror
 * Node Helper for module: mmm-mqtt-avatar
 * Repository URL: https://github.com/moejetz/mmm-toggle-by-presence
 *
 * By Moritz Kraus
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var mqtt = require('mqtt');

module.exports = NodeHelper.create({

    isMqttListenerStarted: false,
    config: {},

	// Used for initialisation. Read and set config overrides, then start presence detection as singleton.
	socketNotificationReceived: function(notification, payload) {

		console.log(this.name + ': received a socket notification. Key: ' + notification + ' - payload:', payload);

        this.config = payload;
        if(notification !== this.config.socketNotificationKey) {
            console.log(this.name + ': wrong socket communication key. Ignoring...');
            return;
        }

        if(this.isMqttListenerStarted) {
            console.log(this.name + ': ignoring new config data because the mqtt listener has already been started.');
        } else {
			this.startMqttListener();
		}
	},


    // Start presence detection
	startMqttListener: function () {

		var self = this;

        var host = '';
        if(self.config.mqttHost.includes('mqtt://')) {
          host = self.config.mqttHost;
        } else {
          host = 'mqtt://' + self.config.mqttHost;
        }

        var client  = mqtt.connect(host);

        client.on('connect', function () {
          client.subscribe(self.config.mqttTopic);
        });

        client.on('message', function (topic, message) {
          self.publishState(self, message+'', topic);
        });
	},


    // Publish state to module (mmm-toggle-by-presence.js)
    publishState: function(self, command, topic) {
        self.sendSocketNotification(this.config.socketNotificationKey, {command: command, topic: topic});
    },

});
