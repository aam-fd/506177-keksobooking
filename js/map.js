'use strict';

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

var TYPES_DESCRIPTION = {
  palace: 'Квартира',
  flat: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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

var Position = {
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630
};

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

var Pin = {
  WIDTH: 65,
  GAP_WIDTH: 33,
  HEIGHT: 87
};

var Feature = {
  MIN: 1,
  MAX: 6
};

var ads = [];

var adsMap = document.querySelector('.map');
var mapActiveState;
var adPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var adPinsList = adsMap.querySelector('.map__pins');
var adCardTemplate = document.querySelector('#card')
    .content;
var filterContainer = document.querySelector('.map__filters-container');
var adsFragment = document.createDocumentFragment();

var getRandomArrElement = function (arr) {
  var randonArrIndex =  Math.round(Math.random() * (arr.length - 1));
  return arr[randonArrIndex];
};

var getRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var getCorrectX = function (adsDescription) {
  return adsDescription.location.x - Pin.GAP_WIDTH;
};

var getCorrectY = function (adsDescription) {
  return adsDescription.location.y - Pin.HEIGHT;
};

var shuffleArr = function (arr) {
  var j, x, i;
  for (i = 0; i < arr.length; i++) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
  return arr;
};

var createAdsDescriptions = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var hostX = getRandomNumber(Position.MIN_X, Position.MAX_X);
    var hostY = getRandomNumber(Position.MIN_Y, Position.MAX_Y);

    ads.push({
      author: {
        avatar: 'img/avatars/user' + AVATAR_NUMBERS[i] + '.png',
      },

      offer: {
        title: TITLES[i],
        address: hostX + ', ' + hostY,
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: getRandomArrElement(TYPES),
        rooms: getRandomNumber(Room.MIN, Room.MAX),
        guests: getRandomNumber(Guest.MIN, Guest.MAX),
        checkin: getRandomArrElement(CHECK_TIMES),
        checkout: getRandomArrElement(CHECK_TIMES),
        features: OTHER_FEATURES.slice(0, getRandomNumber(Feature.MIN, Feature.MAX)),
        description: '',
        photos: shuffleArr(APARTAMENT_PHOTOS),
      },

      location: {
        x: hostX,
        y: hostY,
      }
    });
  }
  return ads;
};

var adsDescriptions = createAdsDescriptions();

mapActiveState = adsMap.classList.remove('map--faded');

var createMapPin = function (adsDescription) {
  var adPin = adPinTemplate.cloneNode(true);
  adPin.style = 'left:' + getCorrectX(adsDescription) + 'px; top:' + getCorrectY(adsDescription) + 'px;';
  adPin.querySelector('img').src = adsDescription.author.avatar;
  adPin.querySelector('img').alt = adsDescription.offer.title;

  return adPin;
};

var renderMapPins = function () {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < adsDescriptions.length; i++) {
    pinFragment.appendChild(createMapPin(adsDescriptions[i]));
  }
  return pinFragment;
};

adPinsList.appendChild(renderMapPins());

var renderCardAds = function (adsDescription) {
  var adCard = adCardTemplate.cloneNode(true);
  adCard.querySelector('.popup__avatar').src = adsDescription.author.avatar;
  adCard.querySelector('.popup__title').textContent = adsDescription.offer.title;
  adCard.querySelector('.popup__text--address').textContent = adsDescription.offer.address;
  adCard.querySelector('.popup__text--price').textContent = adsDescription.offer.price + '₽/ночь';
  adCard.querySelector('.popup__type').textContent = TYPES_DESCRIPTION[adsDescription.offer.type];
  adCard.querySelector('.popup__text--capacity').textContent = adsDescription.offer.rooms + ' комнаты для ' + adsDescription.offer.guests + ' гостей';
  adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsDescription.offer.checkin + ', выезд до' + adsDescription.offer.checkout;
  adCard.querySelector('.popup__description').textContent = adsDescription.offer.description;

  var adCardFeatures = adCard.querySelector('.popup__features');
  adCardFeatures.textContent = '';
  for (var i = 0; i < adsDescription.offer.features.length; i++) {
    adCardFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + adsDescription.offer.features[i] + '"></li>');
  }

  var adCardPhotos = adCard.querySelector('.popup__photos');
  adCardPhotos.textContent = '';
  for (var j = 0; j < adsDescription.offer.photos.length; j++) {
    adCardPhotos.insertAdjacentHTML('beforeend', '<img src="' + adsDescription.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>');
  }

  return adCard;
};

adsFragment.appendChild(renderCardAds(adsDescriptions[0]));
adsMap.insertBefore(adsFragment, filterContainer);
