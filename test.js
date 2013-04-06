var expect = require('chai').expect,
    pubsub = require('ada-pubsub'),
    on     = require('./');

it('can combine multiple pubsubs', function(done){
  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = pubsub(),

      e = on(a, b, function(changed){
        expect(changed.length).to.equal(2);

        expect(changed[0].pubsub).to.equal(a);
        expect(changed[1].pubsub).to.equal(c);

        expect(calledOnce).to.be.true;

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

  expect(e.subscriptions.length).to.equal(4);


  expect(e.subscriptions[1]).to.not.exist;
  expect(e.subscriptions[4]).to.not.exist;

  done();
});
