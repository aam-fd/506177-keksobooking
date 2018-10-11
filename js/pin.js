'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin')
                            .content
                            .querySelector('.map__pin');

  var createPinLayout = function (object) {
    var adPin = pinTemplate.cloneNode(true);

    adPin.style.left = object.location.x - window.constants.Pin.WIDTH / 2 + 'px';
    adPin.style.top = object.location.y - window.constants.Pin.HEIGHT + 'px';

    adPin.querySelector('img').src = object.author.avatar;
    adPin.querySelector('img').alt = object.offer.title;
    adPin.querySelector('img').id = object.id;
    adPin.id = object.id;
    return adPin;
  };

  var createPins = function (array) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      pinFragment.appendChild(createPinLayout(array[i]));
    }
    return pinFragment;
  };

  var pinsList = document.querySelector('.map__pins');

  window.pin = {
    render: function () {
      pinsList.appendChild(createPins(window.data.adsDescriptions));
    },
  };
})();
