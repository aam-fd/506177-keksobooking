'use strict';

window.util = (function () {

  return {

    getRandomNumber: function (min, max) {
      return Math.round(min + Math.random() * (max - min));
    },

    getRandomArrayElement: function (array, callback) {
      var randomArrayIndex = callback(0, array.length - 1);
      return array[randomArrayIndex];
    },

    shuffleArray: function (array) {
      var j;
      var mixedArray = [];

      for (var i = array.length - 1; i >= 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        var x = array[i];
        array[i] = array[j];
        array[j] = x;
        mixedArray[i] = array[i];
      }

      return mixedArray;
    },

    switchDisabled: function (elementArray, state) {
      for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].disabled = state;
      }
    },

    removeClass: function (element, elementClass) {
      element.classList.remove(elementClass);
    },
  };

})();
