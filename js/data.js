'use strict';

(function () {

  var ADS_NUMBER = 8;

  var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var OTHER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var APARTAMENT_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var Guest = {
    MIN: 1,
    MAX: 10
  };

  var Room = {
    MIN: 1,
    MAX: 5
  };

  var Price = {
    MIN: 1000,
    MAX: 1000000
  };

  var Feature = {
    MIN: 1,
    MAX: 6
  };

  var createAdsDescriptions = function () {
    var ads = [];
    for (var i = 0; i < ADS_NUMBER; i++) {
      var hostX = window.util.getRandomNumber(window.constants.Position.MIN_X, window.constants.Position.MAX_X);
      var hostY = window.util.getRandomNumber(window.constants.Position.MIN_Y, window.constants.Position.MAX_Y);

      ads.push({
        author: {
          avatar: 'img/avatars/user' + AVATAR_NUMBERS[i] + '.png',
        },

        offer: {
          title: TITLES[i],
          address: hostX + ', ' + hostY,
          price: window.util.getRandomNumber(Price.MIN, Price.MAX),
          type: window.util.getRandomArrayElement(TYPES),
          rooms: window.util.getRandomNumber(Room.MIN, Room.MAX),
          guests: window.util.getRandomNumber(Guest.MIN, Guest.MAX),
          checkin: window.util.getRandomArrayElement(CHECK_TIMES),
          checkout: window.util.getRandomArrayElement(CHECK_TIMES),
          features: OTHER_FEATURES.slice(0, window.util.getRandomNumber(Feature.MIN, Feature.MAX)),
          description: '',
          photos: window.util.shuffleArray(APARTAMENT_PHOTOS),
        },

        location: {
          x: hostX,
          y: hostY,
        },

        id: i,
      });
    }
    return ads;
  };

  window.data = {
    adsDescriptions: createAdsDescriptions(),
  };

})();
