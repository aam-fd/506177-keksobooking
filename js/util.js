'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  var getRandomArrayElement = function (array) {
    var randomArrayIndex = getRandomNumber(0, array.length - 1);
    return array[randomArrayIndex];
  };

  var shuffleArray = function (array) {
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
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    shuffleArray: shuffleArray,
  };

})();
