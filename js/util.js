'use strict';

window.util = (function () {

  return {

    getRandomNumber: function (min, max) {
      return Math.round(min + Math.random() * (max - min));
    },

    getRandomArrayElement: function (array) {
      var randomArrayIndex = this.getRandomNumber(0, array.length - 1);
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
  };

})();
