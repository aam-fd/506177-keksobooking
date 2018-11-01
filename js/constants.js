'use strict';

window.constants = (function () {

  return {

    TypesDescription: {
      PALACE: 'Дворец',
      FLAT: 'Квартира',
      HOUSE: 'Дом',
      BUNGALO: 'Бунгало'
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
      HEIGHT: 87
    },

    MainPinCoordinate: {
      Y: '320.5',
      X: '570',
    },

    MAP_FADED: 'map--faded',

    FORM_DISABLED: 'ad-form--disabled',

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

    URL: 'https://js.dump.academy/keksobooking',

    SUCCESS_CODE_STATUS: 200,

    ESC_KEYCODE: 27,

  };

})();
