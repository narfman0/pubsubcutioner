var should = require('chai').should(),
    module = require('../dist/pubsubcutioner');

describe('#publish-subscribe', function() {
    it('Test subscribe and publish', function() {
        var event1 = 'event1';
        var value1 = 'value1';
        module.subscribe(event1, function(data){
            data.value.should.equal(value1);
        });
        module.publish(event1, {value: value1});
    });
});
