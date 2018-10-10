'use strict';

(function () {

  var TYPES_DESCRIPTION = {
    palace: 'Квартира',
    flat: 'Дворец',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card')
                             .content;

  var createCardLayout = function (object) {
    var cardLayout = cardTemplate.cloneNode(true);
    cardLayout.querySelector('.popup__avatar').src = object.author.avatar;
    cardLayout.querySelector('.popup__title').textContent = object.offer.title;
    cardLayout.querySelector('.popup__text--address').textContent = object.offer.address;
    cardLayout.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
    cardLayout.querySelector('.popup__type').textContent = TYPES_DESCRIPTION[object.offer.type];
    cardLayout.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    cardLayout.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout;
    cardLayout.querySelector('.popup__description').textContent = object.offer.description;

    var cardFeatures = cardLayout.querySelector('.popup__features');
    cardFeatures.textContent = '';
    for (var i = 0; i < object.offer.features.length; i++) {
      cardFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + object.offer.features[i] + '"></li>');
    }

    var cardPhotos = cardLayout.querySelector('.popup__photos');
    cardPhotos.textContent = '';
    for (var j = 0; j < object.offer.photos.length; j++) {
      cardPhotos.insertAdjacentHTML('beforeend', '<img src="' + object.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>');
    }

    return cardLayout;
  };

  window.createCard = function (object) {
    var card = createCardLayout(object);
    var adFragment = document.createDocumentFragment();
    adFragment.appendChild(card);

    return adFragment;
  };

})();
