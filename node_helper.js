/* Magic Mirror
 * Node Helper for module: mmm-toggle-by-mqtt
 * Repository URL: https://github.com/moejetz/mmm-toggle-by-mqtt
 *
 * By Moritz Kraus
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var mqtt = require('mqtt');
var shell = require('shelljs');
shell.config.execPath = '/usr/bin/node';

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
          message = message + '';
          if(topic===self.config.mqttTopic) {
              if(message==='on') {
                  self.turnDisplayOn();
              } else if(message==='off') {
                  self.turnDisplayOff();
              } else {
                  self.publishState(self, message, topic);
              }
          }

        });
	},


    // Publish state to module (mmm-toggle-by-presence.js)
    publishState: function(self, command, topic) {
        self.sendSocketNotification(this.config.socketNotificationKey, {command: command, topic: topic});
    },

    // Turn display (hdmi) on
    turnDisplayOn: function() {
        shell.exec('vcgencmd display_power 1 >/dev/null 2>&1');
    },

    // Turn display (hdmi) off
    turnDisplayOff: function() {
        shell.exec('vcgencmd display_power 0 >/dev/null 2>&1');
    }

});
