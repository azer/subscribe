var should = require('chai').should(),
    pubsub = require('ada-pubsub'),
    on     = require('./');

it('can combine multiple pubsubs', function(done){
  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = pubsub(),

      e = on(a, b, function(changed){
        changed.length.should.be.equal(2);
        changed[0].pubsub.should.be.equal(a);
        changed[1].pubsub.should.be.equal(c);

        calledOnce.should.be.true;
        calledOnce = false;

        done();
      }),

      calledOnce = true;

  e.subscribeTo(c, d);
  e.unsubscribeTo(b);
  e.unsubscribeTo(d);

  a.publish();
  b.publish();
  c.publish();
});

it('exports subscriptions', function(done){

  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = pubsub(),

      e = on(a, b, function(changed){
      });

  e.subscribeTo(c, d);

  e.unsubscribeTo(b);
  e.unsubscribeTo(d);

  e.subscriptions.length.should.be.equal(4);

  should.not.exist(e.subscriptions[1]);
  should.not.exist(e.subscriptions[4]);


  done();
});
