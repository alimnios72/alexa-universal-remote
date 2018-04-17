/**
 * Created by jorge on 4/1/18.
 */
'use strict';

var os = require('child_process');

module.exports = {
    volumeUp: function (req, res) {
        var cmd = 'irsend SEND_ONCE POLAROID_TV KEY_VOLUMEUP';
        var child = os.spawn(cmd, [], {shell: true});
        res.send('irsend SEND_ONCE POLAROID_TV KEY_VOLUMEUP');
    },

    volumeDown: function (req, res) {
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
