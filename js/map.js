'use strict';

(function () {

  var area = document.querySelector('.map');
  var mainPin = area.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('fieldset');

  var switchDisabled = function (elementArray, state) {
    for (var i = 0; i < elementArray.length; i++) {
      elementArray[i].disabled = state;
    }
  };

  var setDisabled = function () {
    switchDisabled(formElements, true);
  };

  var MAP_FADED_CLASS_NAME = 'map--faded';
  var FORM_DISABLED_CLASS_NAME = 'ad-form--disabled';

  var setActive = function () {
    switchDisabled(formElements, false);
    area.classList.remove(MAP_FADED_CLASS_NAME);
    window.form.adForm.classList.remove(FORM_DISABLED_CLASS_NAME);
  };

  var shiftToPinTail = function () {
    mainPin.style.top = mainPin.offsetTop - window.constants.MainPin.HEIGHT + window.constants.MainPin.WIDTH / 2 + 'px';
  };

  var onMainPinFirstMouseUp = function () {
    setActive();
    shiftToPinTail();
    window.pin.render();
    window.card.render();

    mainPin.removeEventListener('mouseup', onMainPinFirstMouseUp);
  };

  var addressInput = window.form.adForm.querySelector('#address');

  var fillAddress = function (element, elementSize) {
    var pinX = element.offsetLeft + elementSize.WIDTH / 2;
    var pinY;

    if (area.classList.contains(MAP_FADED_CLASS_NAME)) {
      pinY = element.offsetTop + elementSize.WIDTH / 2;
    } else {
      pinY = element.offsetTop + elementSize.HEIGHT;
    }
    addressInput.value = pinX + ', ' + pinY;
  };

  setDisabled();
  fillAddress(mainPin, window.constants.MainPin);

  mainPin.addEventListener('mouseup', onMainPinFirstMouseUp);
  mainPin.addEventListener('mousedown', window.makeDraggable.onMouseDown);

  window.map = {
    area: area,
    mainPin: mainPin,
    fillAddress: fillAddress,
  };

})();
