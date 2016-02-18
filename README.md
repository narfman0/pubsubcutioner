Pubsubcutioner
==============

Pubsub framework supporting regex and a brutal name

Installation
------------

Install via npm:

    npm install -D pubsubcutioner

Usage
-----

Pillage subscribe and publish events as desired:

    var pubsub = require('pubsubcutioner');
    pubsub.subscribe('eventname', function(data){
        console.log(data.text);
    });
    pubsub.publish('eventname', {text: 'Hello, world!'});

The metal piece about this pubsub library is support for regex subscribes:

    pubsub.subscribe('event-.+', function(data){...});

The handler will be invoked each time the "event-.+" regex is matched. ^ is prepended, and $ is
added to the end as well to ensure a tightly bound set of events are fired. In this case, event-1 or
event-2 would both be fired from the same subscription.

License
-------

Copyright (c) 2016 Jon Robison

See included LICENSE for licensing information
