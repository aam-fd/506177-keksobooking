'use strict';

(function () {


  var mapFilterContainer = window.map.map.querySelector('.map__filters-container');
  var renderAdCard = function (selectedAd) {
    window.map.map.insertBefore(window.createCard(selectedAd), mapFilterContainer);
  };
  var onPinClick = function (evt) {
    var clickedElement = evt.target.id;
    var selectedAd = window.data.adsDescriptions[clickedElement];
    renderAdCard(selectedAd);
  };

  window.renderCard = function () {
    var pinElements = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinElements.length; i++) {
      pinElements[i].addEventListener('click', onPinClick);
    }
  };

})();
