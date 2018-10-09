'use strict';

(function () {

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 87
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
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
    map.classList.remove(MAP_FADED_CLASS_NAME);
    window.form.adForm.classList.remove(FORM_DISABLED_CLASS_NAME);
  };

  var shiftToPinTail = function () {
    mainPin.style.top = mainPin.offsetTop - MainPin.HEIGHT + MainPin.WIDTH / 2 + 'px';
  };

  var onMainPinFirstMouseUp = function () {
    setActive();
    shiftToPinTail();
    window.renderPins();
    window.renderCard();

    mainPin.removeEventListener('mouseup', onMainPinFirstMouseUp);
  };

  window.map = {
    map: map,
    MainPin: MainPin,
    mainPin: mainPin,

    setDisabled: setDisabled,
    onMainPinFirstMouseUp: onMainPinFirstMouseUp,
  };

})();
