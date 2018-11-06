'use strict';

window.filter = (function () {

  var ads = [];
  var callback;

  var filterForm = document.querySelector('.map__filters');

  var typeFilter = function (object) {

    var adType = object.offer.type;
    var typeFilterValue = filterForm.querySelector('#housing-type')
                                    .value;

    return typeFilterValue === window.constants.ValueRange.ANY ?
      true :
      adType === typeFilterValue;

  };

  var priceFilter = function (object) {

    var adPrice = object.offer.price;
    var priceFilterValue = filterForm.querySelector('#housing-price')
                                     .value;

    if (priceFilterValue === window.constants.ValueRange.LOW) {
      return adPrice < window.constants.Price.LOWER_LIMIT;

    } else if (priceFilterValue === window.constants.ValueRange.MIDDLE) {
      return adPrice > window.constants.Price.LOWER_LIMIT
             && adPrice < window.constants.Price.HIGHER_LIMIT;

    } else if (priceFilterValue === window.constants.ValueRange.HIGH) {
      return adPrice > window.constants.Price.HIGHER_LIMIT;

    } else {
      return true;
    }
  };

  var roomsFilter = function (object) {

    var adRooms = object.offer.rooms;
    var roomsFilterValue = filterForm.querySelector('#housing-rooms')
                                     .value;

    return roomsFilterValue === window.constants.ValueRange.ANY ?
      true :
      adRooms === +roomsFilterValue;
  };

  var guestsFilter = function (object) {

    var adGuests = object.offer.guests;
    var guestsFilterValue = filterForm.querySelector('#housing-guests')
                                        .value;

    return guestsFilterValue === window.constants.ValueRange.ANY ?
      true :
      adGuests === +guestsFilterValue;

  };

  var featuresFilter = function (object) {

    var adFeatures = object.offer.features;
    var featuresCollection = filterForm.querySelector('#housing-features')
                                        .elements;
    var featuresSelected = [];

    [].forEach.call(featuresCollection, function (element) {
      if (element.checked) {
        featuresSelected.push(adFeatures.includes(element.value));
      }
    });

    return !featuresSelected.includes(false);

  };

  var getFilteredData = function () {
    var filteredAds = ads.filter(typeFilter)
                            .filter(priceFilter)
                            .filter(roomsFilter)
                            .filter(guestsFilter)
                            .filter(featuresFilter)
                            .slice(0, window.constants.MAX_RENDERED_PINS);

    callback(filteredAds);
  };

  var onFilterFormChange = window.debounce(getFilteredData, window.constants.DEBOUNCE_INTERVAL);

  return function (arr, cb) {

    ads = arr;
    callback = cb;

    getFilteredData();

    filterForm.addEventListener('change', onFilterFormChange);

  };

})();
