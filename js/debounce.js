'use strict';

(function () {

  window.debounce = function (action, debounceInterval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        action.apply(null, args);
      }, debounceInterval);
    };
  };

})();
