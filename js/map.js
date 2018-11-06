'use strict';

(function () {

  var main = document.querySelector('main');
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

  var createCard = window.card.create;
  var createPin = window.pin.create;
  var makeDraggable = window.makeDraggable;
  var changeAvatar = window.avatar;
  var filter = window.filter;

  var removeActivePin = function () {
    var activePin = document.querySelector('.' + window.constants.ACTIVE_PIN);
    if (activePin !== null) {
      removeClass(activePin, window.constants.ACTIVE_PIN);
    }
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      area.removeChild(card);
    }
    removeActivePin();
  };

  var onEscPressToCloseCardAd = function (evt) {
    if (evt.keyCode === window.constants.KeyCode.ESC) {
      closeCard();
      removeActivePin();
      document.removeEventListener('keydown', onEscPressToCloseCardAd);
    }
  };

  var onFilterFormToCloseCardAd = function () {
    closeCard();
    filterForm.removeEventListener('change', onFilterFormToCloseCardAd);
  };

  var renderCardAd = function (selectedAd) {
    document.addEventListener('keydown', onEscPressToCloseCardAd);
    filterForm.addEventListener('change', onFilterFormToCloseCardAd);

    var card = document.querySelector('.map__card');
    var ad = createCard(selectedAd, closeCard);

    return card !== null ?
      area.replaceChild(ad, card) :
      area.appendChild(ad);
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

      removeActivePin();

      addClass(pin, window.constants.ACTIVE_PIN);
    };

    for (var i = 0; i < data.length; i++) {
      pins.appendChild(createPin(data[i], i, onPinClick));
    }

    switchDisabled(filterForm, false);
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
      document.removeEventListener('keydown', onEnterPress);
    }
  };

  var calculateCoords = function (element, elementSize) {
    var pinX = element.offsetLeft + elementSize.WIDTH / 2;

    var pinY = area.classList.contains(window.constants.MAP_FADED) ?
      element.offsetTop + elementSize.WIDTH / 2 :
      element.offsetTop + elementSize.HEIGHT;

    return Math.round(pinX) + ', ' + Math.round(pinY);
  };

  var fillAddressByCalculatedCoords = function (element, elementSize) {
    fillInputValue(addressInput, calculateCoords(element, elementSize));
  };

  var setMainPinEventListener = function () {
    document.addEventListener('keydown', onEnterPress);
    mainPin.addEventListener('mouseup', onMainPinFirstMouseUp);
  };

  var setInactiveState = function () {
    switchDisabled(formElements, true);
    addClass(area, window.constants.MAP_FADED);
    addClass(adForm, window.constants.FORM_DISABLED);
    switchDisabled(filterForm, true);
    getMainPinCoords();
    fillAddressByCalculatedCoords(mainPin, window.constants.MainPinSize);
  };

  var resetForm = function () {
    adForm.reset();
  };

  var setInactivePage = function () {
    setInactiveState();
    closeCard();
    deletePins();
    resetForm();
    setMainPinEventListener();
  };

  var getEventMessage = function (eventMessage) {
    var template = document.querySelector('#' + eventMessage)
                                  .content
                                  .querySelector('.' + eventMessage);
    return template.cloneNode(true);
  };

  var onSuccess = function () {

    var success = getEventMessage('success');
    main.appendChild(success);

    var removeEventListener = function () {
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onClick);
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.constants.KeyCode.ESC) {
        main.removeChild(success);
        removeEventListener();
        setInactivePage();
      }
    };

    var onClick = function () {
      main.removeChild(success);
      removeEventListener();
      setInactivePage();
    };


    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onEscPress);
  };

  var onError = function () {

    var error = getEventMessage('error');
    main.appendChild(error);

    var errorButton = error.querySelector('.error__button');

    var removeEventListener = function () {
      errorButton.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onClick);
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.constants.KeyCode.ESC) {
        main.removeChild(error);
        removeEventListener();
      }
    };

    var onClick = function () {
      main.removeChild(error);
      removeEventListener();
    };

    errorButton.addEventListener('click', onClick);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onEscPress);
  };

  var onLoad = function (data) {

    data.forEach(function (ad, index) {
      ad.class = 'pin-' + index;
    });

    renderPins(data);
    filter(data, renderPins);

  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.load('', onSuccess, onError, 'POST', window.constants.Url.POST, new FormData(adForm));
  };

  var onAdFormReset = function () {
    setInactivePage();
  };

  var fileUpload = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');

  var setActiveState = function () {
    switchDisabled(formElements, false);
    removeClass(area, window.constants.MAP_FADED);
    removeClass(adForm, window.constants.FORM_DISABLED);
    shiftMainPinCoordsToTail();

    window.load('json', onLoad, onError, 'GET', window.constants.Url.GET, '');
    makeDraggable(mainPin, window.constants.MainPinSize,
        areaPins, window.constants.Area, fillAddressByCalculatedCoords);
    changeAvatar(fileUpload, avatar);
    adForm.addEventListener('submit', onAdFormSubmit);
    adForm.addEventListener('reset', onAdFormReset);
  };

  setMainPinEventListener();
  setInactiveState();

})();
