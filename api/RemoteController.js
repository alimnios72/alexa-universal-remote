'use strict';

const os = require('child_process');
const COMMAND_DELAY = 500;
const KEY_MAP = {
    Power: 'KEY_POWER',
    VolumeUp: 'KEY_VOLUMEUP',
    VolumeDown: 'KEY_VOLUMEDOWN'
};


module.exports = {
    keys: KEY_MAP,
    sendCommand: function(key, times = 1) {
        const command = `irsend SEND_ONCE POLAROID_TV ${key}`;
        let child;
        let interval = setInterval(() => {
            console.log(command);
            child = os.spawn(command, [], {shell: true});
            times--;
            if (times === 0) {
                clearTimeout(interval);
            } 
        }, COMMAND_DELAY);
    }
};