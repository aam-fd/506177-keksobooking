'use strict';

window.filter = (function () {

  var price = window.constants.Price;
  var valueRange = window.constants.ValueRange;

  var array = [];
  var callback;

  var filterForm = document.querySelector('.map__filters');

  var typeFilter = function (object) {

    var adType = object.offer.type;
    var typeFilterValue = filterForm.querySelector('#housing-type')
                                    .value;

    if (typeFilterValue === valueRange.ANY) {
      return true;
    } else {
      return adType === typeFilterValue;
    }
  };

  var priceFilter = function (object) {

    var adPrice = object.offer.price;
    var priceFilterValue = filterForm.querySelector('#housing-price')
                                      .value;

    if (priceFilterValue === valueRange.LOW) {
      return adPrice < price.LOWER_LIMIT;
    } else if (priceFilterValue === valueRange.MIDDLE) {
      return adPrice > price.LOWER_LIMIT && adPrice < price.HIGHER_LIMIT;
    } else if (priceFilterValue === valueRange.HIGH) {
      return adPrice > price.HIGHER_LIMIT;
    } else {
      return true;
    }
  };

  var roomsFilter = function (object) {

    var adRooms = object.offer.rooms;
    var roomsFilterValue = filterForm.querySelector('#housing-rooms')
                                      .value;

    if (roomsFilterValue === valueRange.ANY) {
      return true;
    } else {
      return adRooms === +roomsFilterValue;
    }
  };

  var guestsFilter = function (object) {

    var adGuests = object.offer.guests;
    var guestsFilterValue = filterForm.querySelector('#housing-guests')
                                        .value;

    if (guestsFilterValue === valueRange.ANY) {
      return true;
    } else {
      return adGuests === +guestsFilterValue;
    }
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

    if (featuresSelected.includes(false)) {
      return false;
    } else {
      return true;
    }

  };

  var getFilteredData = function () {
    var filteredData = array.filter(typeFilter)
                            .filter(priceFilter)
                            .filter(roomsFilter)
                            .filter(guestsFilter)
                            .filter(featuresFilter)
                            .slice(0, window.constants.MAX_RENDERED_PINS);

    callback(filteredData);
  };

  var onFilterFormChange = window.debounce(getFilteredData, window.constants.DEBOUNCE_INTERVAL);

  return function (arr, cb) {

    array = arr;
    callback = cb;

    getFilteredData();

    filterForm.addEventListener('change', onFilterFormChange);

  };

})();
