'use strict';

(function () {

  var area = document.querySelector('.map');
  var mainPin = area.querySelector('.map__pin--main');

  var areaPins = document.querySelector('.map__pins');
  var pins = document.createElement('div');
  pins.setAttribute('class', 'pins');
  areaPins.appendChild(pins);

  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var formElements = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');

  var switchDisabled = window.util.switchDisabled;
  var removeClass = window.util.removeClass;
  var addClass = window.util.addClass;
  var fillInputValue = window.util.fillInputValue;

  var makeDraggable = window.makeDraggable;

  var createCard = window.card.create;
  var createPin = window.pin.create;

  var filter = window.filter;

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      area.removeChild(card);
    }
  };

  var onEscPressToCloseCardAd = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ESC) {
      closeCard();
    }
    document.removeEventListener('keydown', onEscPressToCloseCardAd);
  };

  var onFilterFormToCloseCardAd = function () {
    closeCard();
    filterForm.removeEventListener('change', onFilterFormToCloseCardAd);
  };

  var renderCardAd = function (selectedAd) {
    var card = document.querySelector('.map__card');
    var ad = createCard(selectedAd, closeCard);

    if (card !== null) {
      area.replaceChild(ad, card);
    } else {
      area.appendChild(ad);
    }

    document.addEventListener('keydown', onEscPressToCloseCardAd);
    filterForm.addEventListener('change', onFilterFormToCloseCardAd);
  };

  var deletePins = function () {
    var currPins = pins.querySelectorAll('.map__pin');
    currPins.forEach(function (element) {
      element.remove();
    });
  };

  var renderPins = function (data) {
    deletePins();

    var onPinClick = function (evt) {

      var pin = evt.target.tagName === window.constants.IMG_TAG
        ? evt.target.parentElement
        : evt.target;

      var selectedAd = data[pin.id];
      renderCardAd(selectedAd);

      var activePin = document.querySelector('.' + window.constants.ACTIVE_PIN);
      if (activePin !== null) {
        removeClass(activePin, window.constants.ACTIVE_PIN);
      }

      addClass(pin, window.constants.ACTIVE_PIN);
    };

    for (var i = 0; i < data.length; i++) {
      pins.appendChild(createPin(data[i], i, onPinClick));
    }

    switchDisabled(filterForm, false);
  };

  var onSuccess = function (data) {

    data.forEach(function (ad, index) {
      ad.class = 'pin-' + index;
    });

    renderPins(data);
    filter(data, renderPins);

  };

  var setActiveState = function () {
    switchDisabled(formElements, false);
    removeClass(area, window.constants.MAP_FADED);
    removeClass(adForm, window.constants.FORM_DISABLED);
    shiftMainPinCoordsToTail();
    window.load(onSuccess);
  };

  var getMainPinCoords = function () {
    mainPin.style = 'left: ' + window.constants.MainPinCoordinate.X + 'px; top: '
                             + window.constants.MainPinCoordinate.Y + 'px;';
  };

  var shiftMainPinCoordsToTail = function () {
    mainPin.style = 'left: ' + window.constants.MainPinCoordinate.X + 'px; top: '
                             + (window.constants.MainPinCoordinate.Y
                             - window.constants.MainPinSize.HEIGHT
                             + window.constants.MainPinSize.WIDTH / 2) + 'px;';
  };

  var onMainPinFirstMouseUp = function () {
    setActiveState();

    mainPin.removeEventListener('mouseup', onMainPinFirstMouseUp);
  };

  var onEnterPress = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ENTER) {
      setActiveState();
    }

    document.removeEventListener('keydown', onEnterPress);
  };

  var calculateCoords = function (element, elementSize) {
    var pinX = element.offsetLeft + elementSize.WIDTH / 2;

    var pinY;
    if (area.classList.contains(window.constants.MAP_FADED)) {
      pinY = element.offsetTop + elementSize.WIDTH / 2;
    } else {
      pinY = element.offsetTop + elementSize.HEIGHT;
    }

    return Math.round(pinX) + ', ' + Math.round(pinY);
  };

  var fillAddressByCalculatedCoords = function (element, elementSize) {
    fillInputValue(addressInput, calculateCoords(element, elementSize));
  };

  var setMainPinEventListener = function () {
    document.addEventListener('keydown', onEnterPress);
    mainPin.addEventListener('mouseup', onMainPinFirstMouseUp);
  };

  setMainPinEventListener();

  var setInactiveState = function () {
    switchDisabled(formElements, true);
    addClass(area, window.constants.MAP_FADED);
    addClass(adForm, window.constants.FORM_DISABLED);
    switchDisabled(filterForm, true);
    getMainPinCoords();
    fillAddressByCalculatedCoords(mainPin, window.constants.MainPinSize);
  };

  setInactiveState();
  makeDraggable(mainPin, window.constants.MainPinSize,
      areaPins, window.constants.Area, fillAddressByCalculatedCoords);

  window.map = {
    setInactiveState: setInactiveState,
    closeCard: closeCard,
    deletePins: deletePins,
    setMainPinEventListener: setMainPinEventListener,
  };

})();
