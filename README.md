# mmm-toggle-by-mqtt

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).


## Short description
Shows/hides modules based on mqtt command

## External APIs
none.

## Screenshot
No picture since there is no ui of this module.

## Current development Status
WIP.


## Using the module

* Clone this repository to `MagicMirror/modules/`
* Run ```npm install``` inside the `MagicMirror/modules/mmm-toggle-by-mqtt` folder to install the module
* Add the following configuration block to the modules array in the `MagicMirror/config/config.js` file, then restart MagicMirror:
```js
var config = {
    modules: [
        {
            module: 'mmm-toggle-by-mqtt',
            position: 'fullscreen_below',
            config: {
                'mqttHost': 'mqtt://localhost',
                'mqttTopic': 'mmmToggleByMqtt'
            }
        }
    ]
}
```

To show/hide all DOM elements, send command `show` or `hide` to the specified mqtt topic on the specified mqtt server.
NOTE: this module will not ship with an mqtt server, you have to install and run it manually.

## Configuration options

| Option | Required | Description | Type | Default
| ------ | -------- | ----------- | ---- | -------
| `mqttHost` | Optional | Hostname of mqtt server | _str_ | 'mqtt://localhost'
| `mqttTopic` | Optional | MQTT topic to listen to | _str_ | 'mmmToggleByMqtt'


# License: MIT

The MIT License (MIT)

Copyright (c) 2019

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
