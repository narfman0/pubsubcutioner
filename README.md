Pubsubcutioner
==============

Pubsub framework supporting regex and a fancy name

Origin
------

Shamelessly ripped from https://github.com/mroderick/PubSubJS, and adding regex support

Usage
-----

After grabbing an instance of pubsub, subscribe and publish events as desired:

    var pubsub = require('pubsubcutioner');
    pubsub.subscribe('eventname', function(data){
        console.log(data.text);
    });
    pubsub.publish('eventname', {text: 'Hello, world!'});

License
-------

Copyright (c) 2016 Jon Robison

See included LICENSE for licensing information
