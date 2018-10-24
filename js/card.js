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

  var createCardLayout = function (object, callback) {
    var avatar = object.author.avatar;
    var title = object.offer.title;
    var address = object.offer.address;
    var price = object.offer.price;
    var type = object.offer.type;
    var rooms = object.offer.rooms;
    var guests = object.offer.guests;
    var checkin = object.offer.checkin;
    var checkout = object.offer.checkout;
    var description = object.offer.description;
    var features = object.offer.features;
    var photos = object.offer.photos;

    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = avatar;
    card.querySelector('.popup__title').textContent = title;
    card.querySelector('.popup__text--address').textContent = address;
    card.querySelector('.popup__text--price').textContent = price + '₽/ночь';
    card.querySelector('.popup__type').textContent = TYPES_DESCRIPTION[type];
    card.querySelector('.popup__text--capacity').textContent = rooms + ' комнаты для ' + guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ', выезд до' + checkout;
    card.querySelector('.popup__description').textContent = description;

    var cardFeatures = card.querySelector('.popup__features');
    cardFeatures.textContent = '';
    for (var i = 0; i < features.length; i++) {
      cardFeatures.insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + features[i] + '"></li>');
    }

    var cardPhotos = card.querySelector('.popup__photos');
    cardPhotos.textContent = '';
    for (var j = 0; j < photos.length; j++) {
      cardPhotos.insertAdjacentHTML('beforeend', '<img src="' + photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>');
    }

    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', callback);

    return card;
  };

  window.card = {

    create: function (object, callback) {
      var cardLayout = createCardLayout(object, callback);

      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(cardLayout);

      return cardFragment;
    },

  };

})();
