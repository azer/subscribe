var pubsub    = require('new-pubsub'),
    subscribe = require('./'),
    once      = subscribe.once;

function later(fn){
  setTimeout(fn, 100);
}

it('can combine multiple pubsubs', function(done){
  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = pubsub(),

      e = subscribe(a, b, function(changed){
        expect(changed.length).to.equal(2);

        expect(changed[0].pubsub).to.equal(a);
        expect(changed[1].pubsub).to.equal(c);

        expect(calledOnce).to.be.true;

        calledOnce = false;

        done();
      }),

      calledOnce = true;

  e.add(c, d);
  e.remove(b);
  e.remove(d);

  a.publish();
  b.publish();
  c.publish();
});

it('exports subscriptions', function(){

  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = pubsub(),

      e = subscribe(a, b, function(changed){});

  e.add(c, d);

  e.remove(b);
  e.remove(d);

  expect(e.list.length).to.equal(4);
  expect(e.list[1]).to.not.exist;
  expect(e.list[4]).to.not.exist;
});

it('fires the callback once all subscriptions are published', function(done){

  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = pubsub(),

      e = once(a, b, function(){
        expect(calledOnce).to.be.true;
        expect(calledOnTime).to.be.true;

        calledOnce = false;

        expect(e.done).to.be.true;
        done();
      }),

      calledOnTime = false,
      calledOnce   = true;

  e.add(c, d);
  e.remove(a);

  a.publish();

  expect(e.done).to.not.exist;

  later(function(){
    c.publish();

    later(function(){
      b.publish();

      later(function(){

        calledOnTime = true;
        d.publish();

        later(function(){
          b.publish();
          c.publish();
        });

      });

    });

  });

});

it('destroys itself once its done', function(done){

  var a = pubsub(),
      b = pubsub(),
      c = pubsub(),
      d = once(a, b, c, function(){
        expect(d.list.every(function(el){ return el == undefined; })).to.be.true;

        done();
      });

  d.remove(c);
  expect(c.subscribersForOnce[0]).to.not.exist;

  a.publish();
  b.publish();

});
