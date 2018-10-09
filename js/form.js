'use strict';

(function () {

  // adForm.action = 'https://js.dump.academy/keksobooking';
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');

  var selectInvalidFieldForm = function (field) {
    field.classList.add('ad-form__error');
  };

  var TYPES_PRICE = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  var getTimeInput = function (input, value) {
    input.value = value;
  };

  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');

  var getRoomCapacity = function () {
    var numberRooms = roomNumberInput.value;

    // булевые значения для кол-ва гостей
    // false для дизактивации disabled
    // 0:'для 3 гостей', 1:'для 2 гостей' , 2:'для 1 гостя', 3:'не для гостей'
    var roomCapacity = {
      '1': [true, true, false, true],
      '2': [true, false, false, true],
      '3': [false, false, false, true],
      '100': [true, true, true, false]
    };

    var countGuests = roomCapacity[numberRooms];

    for (var i = 0; i < capacityInput.length; i++) {
      capacityInput[i].disabled = countGuests[i];
      capacityInput[i].selected = !countGuests[i];
    }
  };


  var fillAddressDisabledField = function () {
    var pinX = window.map.mainPin.offsetLeft + window.map.MainPin.WIDTH / 2;
    var pinY = window.map.mainPin.offsetTop + window.map.MainPin.WIDTH / 2;
    addressInput.value = pinX + ', ' + pinY;
  };

  var fillAddressActiveField = function () {
    var pinX = window.map.mainPin.offsetLeft + window.map.MainPin.WIDTH / 2;
    var pinY = window.map.mainPin.offsetTop + window.map.MainPin.HEIGHT;
    addressInput.value = pinX + ', ' + pinY;
  };

  var onInvalidFieldsSelect = function (evt) {
    selectInvalidFieldForm(evt.target);
  };

  var getPriceInput = function () {
    var choosenType = typeInput.value;
    priceInput.min = TYPES_PRICE[choosenType];
    priceInput.placeholder = TYPES_PRICE[choosenType];
  };

  var onTypeInputChange = function () {
    getPriceInput();
  };

  var onTimeInInputChange = function (evt) {
    getTimeInput(timeOutInput, evt.target.value);
  };

  var onTimeOutInputChange = function (evt) {
    getTimeInput(timeInInput, evt.target.value);
  };

  var onRoomNumberChange = function () {
    getRoomCapacity();
  };


  window.form = {
    adForm: adForm,
    typeInput: typeInput,
    timeInInput: timeInInput,
    timeOutInput: timeOutInput,
    roomNumberInput: roomNumberInput,

    fillAddressDisabledField: fillAddressDisabledField,
    fillAddressActiveField: fillAddressActiveField,

    getPriceInput: getPriceInput,
    getRoomCapacity: getRoomCapacity,

    onInvalidFieldsSelect: onInvalidFieldsSelect,
    onTypeInputChange: onTypeInputChange,
    onTimeInInputChange: onTimeInInputChange,
    onTimeOutInputChange: onTimeOutInputChange,
    onRoomNumberChange: onRoomNumberChange,
  };

})();
