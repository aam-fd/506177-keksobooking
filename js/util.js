'use strict';

window.util = (function () {

  return {

    switchDisabled: function (elementArray, state) {
      [].forEach.call(elementArray, function (element) {
        element.disabled = state;
      });
    },

    fillInputValue: function (input, value) {
      input.value = value;
    },

    removeClass: function (element, elementClass) {
      element.classList.remove(elementClass);
    },

    addClass: function (element, elementClass) {
      element.classList.add(elementClass);
    },
  };

})();
