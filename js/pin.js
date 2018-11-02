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

    var pin = pinTemplate.cloneNode(true);

    pin.style.left = x - window.constants.PinSize.WIDTH / 2 + 'px';
    pin.style.top = y - window.constants.PinSize.HEIGHT + 'px';

    var img = pin.querySelector('img');
    img.src = avatar;
    img.alt = title;
    img.id = id;
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
