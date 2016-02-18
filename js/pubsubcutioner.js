function Pubsubcutioner() {
    var messages = {};

    function gatherSubscribers(topic){
        var subscribers = [];
        for(var message in messages) {
            if( new RegExp('^' + message + '$').test( topic ) ){
                subscribers = subscribers.concat( messages[message] );
            }
        }
        return subscribers;
    }

    // Publicly exposed methods
    var methods = {};
    /**
     *    Pubsubcutioner.publish( message[, data] ) -> Boolean
     *    - message (String): The message to publish
     *    - data: The data to pass to subscribers
     *    Publishes the the message, passing the data to it's subscribers
    **/
    methods.publish = function( message, data ){
        var subscribers = gatherSubscribers(message), s;
        for (s in subscribers){
            if ( subscribers.hasOwnProperty(s)){
                subscribers[s](message, data);
            }
        }
        return true;
    };

    /**
     *    Pubsubcutioner.subscribe( message, func ) -> String
     *    - message (String): The message to subscribe to
     *    - func (Function): The function to call when a new message is published
     *    Subscribes the passed function to the passed message.
    **/
    methods.subscribe = function( message, func ){
        if ( typeof func !== 'function'){
            return false;
        }

        // message is not registered yet
        if ( !messages.hasOwnProperty( message ) ){
            messages[message] = [];
        }

        messages[message] = messages[message].concat(func);
        return true;
    };

    /* Public: Clears all subscriptions
     */
    methods.clearAllSubscriptions = function clearAllSubscriptions(){
        messages = {};
    };

    /*Public: Clear subscriptions by the topic
    */
    methods.clearSubscriptions = function clearSubscriptions(topic){
        var m;
        for (m in messages){
            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
                delete messages[m];
            }
        }
    };

    /* Public: removes subscriptions.
     * When passed a token, removes a specific subscription.
     * When passed a function, removes all subscriptions for that function
     * When passed a topic, removes all subscriptions for that topic (hierarchy)
     *
     * value - A token, function or topic to unsubscribe.
     *
     * Examples
     *
     *        // Example 1 - unsubscribing with a token
     *        var token = Pubsubcutioner.subscribe('mytopic', myFunc);
     *        Pubsubcutioner.unsubscribe(token);
     *
     *        // Example 2 - unsubscribing with a function
     *        Pubsubcutioner.unsubscribe(myFunc);
     *
     *        // Example 3 - unsubscribing a topic
     *        Pubsubcutioner.unsubscribe('mytopic');
     */
    methods.unsubscribe = function(value){
        var isTopic    = typeof value === 'string' && messages.hasOwnProperty(value),
            isFunction = typeof value === 'function',
            result = false,
            m, message, t;

        if (isTopic){
            delete messages[value];
            return;
        }

        for ( m in messages ){
            if ( messages.hasOwnProperty( m ) ){
                message = messages[m];

                if (isFunction) {
                    for ( t in message ){
                        if (message.hasOwnProperty(t) && message[t] === value){
                            delete message[t];
                            result = true;
                        }
                    }
                }
            }
        }

        return result;
    };

    if(typeof window !== 'undefined'){
        window.pubsubcutioner = methods;
    }
    return methods;
}
