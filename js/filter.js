'use strict';

window.filter = (function () {

  var ads = [];
  var callback;

  var filterForm = document.querySelector('.map__filters');

  var typeFilter = function (object) {

    var adType = object.offer.type;
    var typeFilterValue = filterForm.querySelector('#housing-type')
                                    .value;

    if (typeFilterValue === window.constants.ValueRange.ANY) {
      return true;
    }
    return adType === typeFilterValue;

  };

  var priceFilter = function (object) {

    var adPrice = object.offer.price;
    var priceFilterValue = filterForm.querySelector('#housing-price')
                                     .value;

    switch (priceFilterValue) {
      case window.constants.ValueRange.LOW :
        return adPrice < window.constants.Price.LOWER_LIMIT;
      case window.constants.ValueRange.MIDDLE :
        return adPrice > window.constants.Price.LOWER_LIMIT
               && adPrice < window.constants.Price.HIGHER_LIMIT;
      case window.constants.ValueRange.HIGH :
        return adPrice > window.constants.Price.HIGHER_LIMIT;
      default :
        return true;
    }
  };

  var roomsFilter = function (object) {

    var adRooms = object.offer.rooms;
    var roomsFilterValue = filterForm.querySelector('#housing-rooms')
                                     .value;

    if (roomsFilterValue === window.constants.ValueRange.ANY) {
      return true;
    }
    return adRooms === +roomsFilterValue;

  };

  var guestsFilter = function (object) {

    var adGuests = object.offer.guests;
    var guestsFilterValue = filterForm.querySelector('#housing-guests')
                                        .value;

    if (guestsFilterValue === window.constants.ValueRange.ANY) {
      return true;
    }
    return adGuests === +guestsFilterValue;
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
