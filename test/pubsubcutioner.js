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
});

describe('#publish-subscribe-regex', function() {
    it('Test subscribe and publish', function() {
        var results = {};
        module.subscribe(eventR, function(name, data){
            results[name] = data;
        });
        module.publish(event1, {value: value1});
        module.publish(event2, {value: value2});
        Object.keys(results).length.should.equal(2);
        // results.should.eventually.have.length(2);
    });
});
