'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin')
                            .content
                            .querySelector('.map__pin');

  var createPinLayout = function (object, id, onPinClick) {

    var x = object.location.x;
    var y = object.location.y;
    var avatar = object.author.avatar;
    var title = object.offer.title;
    var pinSize = window.constants.PinSize;

    var pin = pinTemplate.cloneNode(true);

    pin.style.left = x - pinSize.WIDTH / 2 + 'px';
    pin.style.top = y - pinSize.HEIGHT + 'px';
    pin.querySelector('img').src = avatar;
    pin.querySelector('img').alt = title;
    pin.querySelector('img').id = id;
    pin.id = id;
    pin.addEventListener('click', onPinClick);

    return pin;
  };

  window.pin = {

    create: function (description, id, onPinClick) {
      var pinFragment = document.createDocumentFragment();
      return pinFragment.appendChild(createPinLayout(description, id, onPinClick));
    },

  };
})();