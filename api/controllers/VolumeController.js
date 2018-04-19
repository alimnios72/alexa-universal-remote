'use strict';

var os = require('child_process');

module.exports = {
    volumeUp: function (level) {
        var cmd = 'irsend SEND_ONCE POLAROID_TV KEY_VOLUMEUP';
        for (var i=0; i<level; i++) {
            var child = os.spawn(cmd, [], {shell: true});
            console.log(cmd);
        }
    },

    volumeDown: function (level) {
        var cmd = 'irsend SEND_ONCE POLAROID_TV KEY_VOLUMEDOWN';
        for (var i=0; i<level; i++) {
            var child = os.spawn(cmd, [], {shell: true});
            console.log(cmd);
        }
    },

    volumeDown1: function (req, res) {
        var cmd = '/usr/bin/irsend SEND_ONCE POLAROID_TV KEY_VOLUMEDOWN';
        var child = os.execFile(cmd, [], function(err, stdout, stderr) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('stdout: '+stdout);
            console.log('stderr: '+stderr);
        });
        res.send('irsend SEND_ONCE POLAROID_TV KEY_VOLUMEDOWN');
        //     function(err, stdout, stderr) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //
        //     console.log('stdout: '+stdout);
        //     console.log('stderr: '+stderr);
        //     res.send('irsend SEND_ONCE POLAROID_TV KEY_VOLUMEDOWN');
        // });
    }
    // return {
    //     volumeUp: changeVolumeUp,
    //     volumeDown: changeVolumeDown
    // }
};
// tell universal remote to turn t.v. on
// tell universal remote to increase volume by 5