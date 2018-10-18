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

    var getRandomNumber = window.util.getRandomNumber;
    var getRandomElement = window.util.getRandomArrayElement;
    var shuffleArray = window.util.shuffleArray;
    var area = window.constants.Area;


    for (var i = 0; i < ADS_NUMBER; i++) {
      var hostX = getRandomNumber(area.MIN_X, area.MAX_X);
      var hostY = getRandomNumber(area.MIN_Y, area.MAX_Y);

      ads.push({
        author: {
          avatar: 'img/avatars/user' + AVATAR_NUMBERS[i] + '.png',
        },

        offer: {
          title: TITLES[i],
          address: hostX + ', ' + hostY,
          price: getRandomNumber(Price.MIN, Price.MAX),
          type: getRandomElement(TYPES, getRandomNumber),
          rooms: getRandomNumber(Room.MIN, Room.MAX),
          guests: getRandomNumber(Guest.MIN, Guest.MAX),
          checkin: getRandomElement(CHECK_TIMES, getRandomNumber),
          checkout: getRandomElement(CHECK_TIMES, getRandomNumber),
          features: OTHER_FEATURES.slice(0, getRandomNumber(Feature.MIN, Feature.MAX)),
          description: '',
          photos: shuffleArray(APARTAMENT_PHOTOS),
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
