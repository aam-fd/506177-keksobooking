'use strict';

(function () {

  var pinsList = window.map.map.querySelector('.map__pins');

  window.renderPins = function () {
    pinsList.appendChild(window.createPins(window.data.adsDescriptions));
  };

})();
