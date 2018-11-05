'use strict';

window.constants = (function () {

  return {

    TypesDescription: {
      PALACE: 'Дворец',
      FLAT: 'Квартира',
      HOUSE: 'Дом',
      BUNGALO: 'Бунгало'
    },

    TypesPrice: {
      PALACE: 10000,
      FLAT: 1000,
      HOUSE: 5000,
      BUNGALO: 0
    },

    Area: {
      MIN_X: 0,
      MAX_X: 1200,
      MIN_Y: 130,
      MAX_Y: 630
    },

    PinSize: {
      WIDTH: 50,
      HEIGHT: 70,
    },

    MainPinSize: {
      WIDTH: 65,
      HEIGHT: 84
    },

    MainPinCoordinate: {
      X: '570',
      Y: '375',
    },

    MAP_FADED: 'map--faded',

    FORM_DISABLED: 'ad-form--disabled',

    ACTIVE_PIN: 'map__pin--active',

    IMG_TAG: 'IMG',

    MAX_RENDERED_PINS: 5,

    Price: {
      LOWER_LIMIT: 10000,
      HIGHER_LIMIT: 50000,
    },

    ValueRange: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high',
      ANY: 'any'
    },

    DEBOUNCE_INTERVAL: 500,

    URL_FOR_POST: 'https://js.dump.academy/keksobooking',
    URL_FOR_GET: 'https://js.dump.academy/keksobooking/data',

    CodeStatus: {
      OK: 200,
      NOT_FOUND: 404,
      SERVER_ERROR: 500,
    },

    KeyCode: {
      ESC: 27,
      ENTER: 13
    },
  };

})();
