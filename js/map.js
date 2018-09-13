'use strict';

var ADS_NUMBER = 8;
// размеры поля объявлений
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
// границы параметров жилья
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var typesDecsription = {
  palace: 'Квартира',
  flat: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var checkTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var otherFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var apartamentPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var getNoRepeatElement = function (arr) {
  for (var i = arr.length; i > 0; i--) {
    var randomElement = Math.floor(Math.random() * arr.length);
  }
  return arr.splice(randomElement, 1);
};

var getSortRandomNumber = function () {
  return Math.random() - 0.5;
};
var mixApartamentPhotos = apartamentPhotos.sort(getSortRandomNumber);


var getAdsDescriptions = function () {
  var ads = [];
  for (var i = 0; i < ADS_NUMBER; i++) {
    ads.push({
      author: {
        avatar: 'img/avatars/user0' + getNoRepeatElement(avatarNumbers) + '.png', // адреса изображений не повторяются
      },

      offer: {
        title: getNoRepeatElement(titles), // значения не должны повторяться
        address: '', // строка, адрес предложения, например, "600, 350"
        price: getRandomNumber(1, 1000) * 1000, // рандом цена от 1000 до 1000000, округленная до тысяч
        type: types[getRandomNumber(0, types.length)], // рандом от 0 до 3, palace, flat, house или bungalo
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS), // рандом 1 до 5
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS), // рандом от 1 до 10
        checkin: checkTimes[getRandomNumber(0, checkTimes.length)], // рандом от 0 до 2
        checkout: checkTimes[getRandomNumber(0, checkTimes.length)], // рандом от 0 до 2
        features: otherFeatures,
        description: 'Welcome to Tokyo!',
        photos: mixApartamentPhotos, // массив из строк, расположенных в произвольном порядке
      },

      location: {
        x: getRandomNumber(MIN_X, MAX_X), // случайное число, координата x метки на карте.
        y: getRandomNumber(MIN_Y, MAX_Y), // случайное число, координата y метки на карте от 130 до 630.
      }
    });
  }

  return ads;
};

var adsDescriptions = getAdsDescriptions();

var mapAds = document.querySelector('.map');
mapAds.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getCorrectX = function (adsDescription) {
  return adsDescription.location.x - 33;
};

var getCorrectY = function (adsDescription) {
  return adsDescription.location.y - 87;
};

var getRenderMapPin = function (adsDescription) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.classList.add('map__pin--main');
  mapPin.style = 'left:' + getCorrectX(adsDescription) + 'px; top:' + getCorrectY(adsDescription) + 'px;'; // 33 87
  mapPin.querySelector('img').src = adsDescription.author.avatar;
  mapPin.querySelector('img').alt = adsDescription.offer.title;
  mapPin.querySelector('img').height = 44;

  return mapPin;
};

var fillFragmentPin = function () {
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < adsDescriptions.length; i++) {
    fragmentPin.appendChild(getRenderMapPin(adsDescriptions[i]));
  }
  return fragmentPin;
};

var mapPinsList = mapAds.querySelector('.map__pins');
mapPinsList.appendChild(fillFragmentPin());

var cardTemplate = document.querySelector('#card')
    .content;

var getRenderCardAds = function (adsDescription) {
  var cardAds = cardTemplate.cloneNode(true);
  cardAds.querySelector('.popup__avatar').src = adsDescription.author.avatar;
  cardAds.querySelector('.popup__title').textContent = adsDescription.offer.title;
  cardAds.querySelector('.popup__text--address').textContent = 'город Токио, координаты: ' + adsDescription.location.x + ', ' + adsDescription.location.y + '.';
  cardAds.querySelector('.popup__text--price').textContent = adsDescription.offer.price + '₽/ночь';
  cardAds.querySelector('.popup__type').textContent = typesDecsription[adsDescription.offer.type];
  cardAds.querySelector('.popup__text--capacity').textContent = adsDescription.offer.rooms + ' комнаты для ' + adsDescription.offer.guests + ' гостей';
  cardAds.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsDescription.offer.checkin + ', выезд до' + adsDescription.offer.checkout;
  cardAds.querySelector('.popup__description').textContent = adsDescription.offer.description;

  cardAds.querySelector('.popup__features').textContent = '';
  for (var i = 0; i < getRandomNumber(1, 6); i++) {
    cardAds.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + adsDescription.offer.features[i] + '"></li>');
  }

  cardAds.querySelector('.popup__photos').textContent = '';
  for (var j = 0; j < 3; j++) {
    cardAds.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + adsDescription.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>');
  }

  return cardAds;
};

var fragmentAds = document.createDocumentFragment();
fragmentAds.appendChild(getRenderCardAds(adsDescriptions[0]));

var filterContainer = document.querySelector('.map__filters-container');
mapAds.insertBefore(fragmentAds, filterContainer);
