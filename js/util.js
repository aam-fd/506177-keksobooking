'use strict';

window.util = (function () {

  return {

    switchDisabled: function (elementArray, state) {
      for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].disabled = state;
      }
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
