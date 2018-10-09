'use strict';

(function () {

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createPinLayout = function (object) {
    var adPin = pinTemplate.cloneNode(true);

    adPin.style.left = object.location.x - Pin.WIDTH / 2 + 'px';
    adPin.style.top = object.location.y - Pin.HEIGHT + 'px';

    adPin.querySelector('img').src = object.author.avatar;
    adPin.querySelector('img').alt = object.offer.title;
    adPin.querySelector('img').id = object.id;
    adPin.id = object.id;
    return adPin;
  };

  window.createPins = function (array) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      pinFragment.appendChild(createPinLayout(array[i]));
    }
    return pinFragment;
  };

})();
