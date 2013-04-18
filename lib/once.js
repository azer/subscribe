module.exports = once;

function once(){
  var pubsubs       = Array.prototype.slice.call(arguments, 0, arguments.length - 1),
      subscriptions = [],
      callback      = arguments[arguments.length - 1],
      counter       = 0,
      self          = {
        add    : add,
        remove : rm,
        list   : subscriptions
      };

  add.apply(undefined, Array.prototype.slice.call(arguments, 0, arguments.length - 1));

  return self;

  function add(){
    var i   = -1,
        len = arguments.length, cb;

    while( ++i < len ){
      cb = proxy(arguments[i]);
      arguments[i].subscribe.once(cb);

      subscriptions.push({
        pubsub: arguments[i],
        callback: cb
      });
    }

  }

  function rm(pubsub){
    var i = subscriptions.length,
        removed = false;

    while( i --> 0 ){
      if(subscriptions[i] && subscriptions[i].pubsub == pubsub){
        pubsub.unsubscribe.once(subscriptions[i].callback);
        subscriptions[i] = undefined;
        counter++;
        removed = true;
      }
    }

    return removed;
  }

  function proxy(pubsub){
    return function(){

      if(!rm(pubsub)){
        return;
      }

      if(counter >= subscriptions.length){
        subscriptions = undefined;
        self.done = true;
        callback();
      }

    };
  }
}
