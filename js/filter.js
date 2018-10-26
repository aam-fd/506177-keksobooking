'use strict';

window.filter = (function () {
  var Filter = {
    'type': 'flat',
    'price': '', // any, low, middle, high
    'rooms': '',
    'guests': '',
    'features': []
  };

  // var Price = {
  //   LOW: 10000,
  //   HIGH: 50000,
  // };

  var array;
  var name;
  var value;
  var callback;

  var onFilterFormChange = function (evt) {
    value = evt.target.value;

    if (evt.target.name === 'features') {
      name = evt.target.name;
      Filter[name].push(value);
    } else {
      name = evt.target.name.slice(8);

      if (name === 'rooms' || name === 'guests') {
        Filter[name] = +value;
      } else {
        Filter[name] = value;
      }
    }

    // console.log(Filter);
    // console.log(name);

    var choosenAds = array.filter(function (object) {
      return object.offer.type === Filter.type;
    });

    if (Filter[name] === 'any') {
      choosenAds = array;
    }

    // console.log(choosenAds);
    callback(choosenAds);
  };

  return function (filter, arr, cb) {

    array = arr;
    callback = cb;

    filter.addEventListener('change', onFilterFormChange);

  };
})();
