module.exports = on;

function on(/* pubsubs..., callback */){
  var callback      = arguments[arguments.length - 1],
      subscriptions = [],
      fired         = [],
      timer;

  function newSubscriber(pubsub){
    return function(){
      var args  = arguments;

      fired.push({ pubsub: pubsub, params: args });

      if(timer){
        clearTimeout(timer);
        timer = undefined;
      }

      timer = setTimeout(function(){
        callback(fired);
        fired = [];
      }, 0);
    };
  }

  function add(){
    var i = -1,
        len = arguments.length,
        cb;

    while( ++i < len ){
      cb = newSubscriber(arguments[i]);
      arguments[i].subscribe(cb);

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
        pubsub.unsubscribe(subscriptions[i].callback);
        subscriptions[i] = undefined;
      }
    }
  }

  add.apply(undefined, Array.prototype.slice.call(arguments, 0, arguments.length - 1));

  return {
    subscriptions: subscriptions,
    subscribeTo: add,
    unsubscribeTo: rm
  };
}
