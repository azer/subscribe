Calls the callback when any of given pubsub instances is emitted.

```js
var pubsub = require('ada-pubsub'),
    on     = require('ada-on');

var a = pubsub(),
    b = pubsub(),
    c = pubsub();

on(a, b, c, function(updates){
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
