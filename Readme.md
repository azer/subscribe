Subscribe to multiple pub/subs.

```js
var pubsub = require('new-pubsub'),
    subscribe = require('subscribe');

var a = pubsub(),
    b = pubsub(),
    c = pubsub();

subscribe(a, b, c, function(updates){ // or subscribe.once(a, b, c, function(){ ...
    updates[0].pubsub;
    // => a.onUpdate
    updates[0].params;
    // => 3, 4

    updates[1].pubsub;
    // => c.onUpdate
    updates[1].params;
    // => 5, 6
});

a.publish(3, 4);
c.publish(5, 6);
```
