'use strict';

(function () {

  var area = document.querySelector('.map');
  var mainPin = area.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('fieldset');

  var areaPins = document.querySelector('.map__pins');
  var pins = document.createElement('div');
  pins.setAttribute('class', 'pins');
  areaPins.appendChild(pins);

  var filterForm = document.querySelector('.map__filters');

  var areaSize = window.constants.Area;
  var mainPinSize = window.constants.MainPinSize;
  var fadedClass = window.constants.MAP_FADED;
  var disabledClass = window.constants.FORM_DISABLED;

  var switchDisabled = window.util.switchDisabled;
  var removeClass = window.util.removeClass;

  var adForm = window.form.adForm;
  var fillAddress = window.form.fillAddress;

  var makeDraggable = window.makeDraggable;

  var createCard = window.card.create;
  var createPin = window.pin.create;

  var filter = window.filter;

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    area.removeChild(card);
  };

  var onEscPressToCloseCardAd = function (evt) {
    if (evt.keyCode === 27) {
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

  var renderPins = function (data) {

    var currPins = pins.querySelectorAll('.map__pin');

    currPins.forEach(function (element) {
      element.remove();
    });

    var onPinClick = function (evt) {
      var selectedAd = data[evt.target.id];
      renderCardAd(selectedAd);
    };

    for (var i = 0; i < data.length; i++) {
      pins.appendChild(createPin(data[i], i, onPinClick));
    }
  };

  var onSuccess = function (data) {
    renderPins(data);
    filter(data, renderPins);
  };

  var setDisabled = function () {
    switchDisabled(formElements, true);
  };
  setDisabled();

  var setActive = function () {
    switchDisabled(formElements, false);

    removeClass(area, fadedClass);
    removeClass(adForm, disabledClass);
  };

  var shiftToPinTail = function () {
    mainPin.style.top = mainPin.offsetTop - mainPinSize.HEIGHT + mainPinSize.WIDTH / 2 + 'px';
  };

  var onMainPinFirstMouseUp = function () {
    setActive();
    shiftToPinTail();

    window.load(onSuccess);

    mainPin.removeEventListener('mouseup', onMainPinFirstMouseUp);
  };

  var calculateCoords = function (element, elementSize) {
    var pinX = element.offsetLeft + elementSize.WIDTH / 2;

    var pinY;
    if (area.classList.contains(fadedClass)) {
      pinY = element.offsetTop + elementSize.WIDTH / 2;
    } else {
      pinY = element.offsetTop + elementSize.HEIGHT;
    }

    return pinX + ', ' + pinY;
  };

  var fillAddressByCalculatedCoords = function (element, elementSize) {
    fillAddress(calculateCoords(element, elementSize));
  };

  mainPin.addEventListener('mouseup', onMainPinFirstMouseUp);
  fillAddressByCalculatedCoords(mainPin, mainPinSize);

  makeDraggable(mainPin, mainPinSize, area, areaSize, fillAddressByCalculatedCoords);

  window.map = {
    area: area,
    mainPin: mainPin,
    mainPinSize: mainPinSize,
    calculateCoords: calculateCoords,
    fillAddressByCalculatedCoords: fillAddressByCalculatedCoords,
  };

})();
