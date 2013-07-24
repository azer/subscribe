## subscribe [![Build Status](https://travis-ci.org/azer/subscribe.png)](https://travis-ci.org/azer/subscribe)

Subscribe to multiple pub/subs.

## Install

```js
$ npm install subscribe
```

## Usage

```js
pubsub = require('pubsub')
subscribe = require('subscribe')

a = pubsub()
b = pubsub()
c = pubsub()

subscribe(a, b, c, function(updates){

    updates[0].pubsub
    // => a.onUpdate

    updates[0].params
    // => 3, 4

    updates[1].pubsub
    // => c.onUpdate

    updates[1].params
    // => 5, 6

})

a.publish(3, 4)
c.publish(5, 6)
```

## Subscribing For Once

`subscribe.once` fires the callback once all the pubsubs publish, for one time.

```js
a = pubsub()
b = pubsub()
c = pubsub()

once(a, b, c, function(){

    console.log('a, b, and c published')

})

a.publish(3, 4)
b.publish(5, 6)
c.publish(7, 8)
```

![](http://distilleryimage1.s3.amazonaws.com/95e26d20910711e29deb22000a1f9355_6.jpg)
