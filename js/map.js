'use strict';

(function () {

  var area = document.querySelector('.map');
  var mainPin = area.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('fieldset');

  var areaSize = window.constants.Area;
  var mainPinSize = window.constants.MainPinSize;
  var fadedClass = window.constants.MAP_FADED;
  var disabledClass = window.constants.FORM_DISABLED;

  var switchDisabled = window.util.switchDisabled;
  var removeClass = window.util.removeClass;

  var adForm = window.form.adForm;
  var fillAddress = window.form.fillAddress;

  var makeDraggable = window.makeDraggable;
  var descriptions = window.data.adsDescriptions;

  var createAd = window.card.create;
  var onCloseCardClick = window.card.onCloseCardClick;
  var createPin = window.pin.create;

  var deleteCard = function () {
    var mapCard = document.querySelector('.map__card');
    area.removeChild(mapCard);
  };

  var onCloseButtonClick = function () {
    deleteCard();
  };

  var renderAd = function (selectedAd) {
    var mapCard = document.querySelector('.map__card');
    var ad = createAd(selectedAd);
    if (mapCard !== null) {
      area.replaceChild(ad, mapCard);
    } else {
      area.appendChild(ad);
    }
  };

  var onPinClick = function (evt) {
    var selectedAd = descriptions[evt.target.id]; //
    renderAd(selectedAd);

    onCloseCardClick(onCloseButtonClick);
  };

  var renderSelectedAd = function () {
    var pinElements = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinElements.length; i++) {
      pinElements[i].addEventListener('click', onPinClick);
    }
  };

  var renderPins = function (data) {
    var pinsList = document.querySelector('.map__pins');
    pinsList.appendChild(createPin(data)); //
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

  var getData = function (data) {
    return data;
  };

  var onMainPinFirstMouseUp = function () {
    setActive();
    shiftToPinTail();

    window.load(getData);

    renderPins();
    renderSelectedAd();

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
