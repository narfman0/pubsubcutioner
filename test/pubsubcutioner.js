var should = require('chai').should(),
    module = require('../dist/pubsubcutioner');

var event1 = 'event1',
    event2 = 'event2',
    eventR = 'event.+',
    value1 = 'value1',
    value2 = 'value2';

describe('#publish-subscribe-simple', function() {
    it('Test subscribe and publish', function() {
        module.subscribe(event1, function(name, data){
            name.should.equal(event1);
            data.value.should.equal(value1);
        });
        module.publish(event1, {value: value1});
    });
    after(function() {
        module.unsubscribe(event1);
    });
});

describe('#publish-subscribe-regex', function() {
    it('Test subscribe and publish regex', function() {
        var results = {};
        module.subscribe(eventR, function(name, data){
            results[name] = data;
        });
        module.publish(event1, {value: value1});
        module.publish(event2, {value: value2});
        Object.keys(results).length.should.equal(2);
    });
    after(function() {
        module.unsubscribe(event1);
        module.unsubscribe(event2);
    });
});

describe('#publish-subscribe-exception', function() {
    it('Test subscribe and publish exceptions', function() {
        module.subscribe(event1, function(name, data){
            garbage();
        });
        module.publish(event1, {});
        // if we made it here there is no crash :)
    });
    after(function() {
        module.unsubscribe(event1);
    });
});
