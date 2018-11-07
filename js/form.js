'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var selectInvalidFieldForm = function (field) {
    field.classList.add('ad-form__error');
  };

  var onInvalidFieldsSelect = function (evt) {
    selectInvalidFieldForm(evt.target);
  };

  var typeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var getPriceInput = function () {
    var choosenType = typeInput.value;
    priceInput.min = window.constants.TypesPrice[choosenType.toUpperCase()];
    priceInput.placeholder = window.constants.TypesPrice[choosenType.toUpperCase()];
  };

  var onTypeInputChange = function () {
    getPriceInput();
  };

  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  var getTimeInput = function (input, value) {
    input.value = value;
  };

  var onTimeInInputChange = function (evt) {
    getTimeInput(timeOutInput, evt.target.value);
  };

  var onTimeOutInputChange = function (evt) {
    getTimeInput(timeInInput, evt.target.value);
  };

  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');

  var getRoomCapacity = function () {
    var numberRooms = roomNumberInput.value;

    // булевые значения для кол-ва гостей
    // false для дизактивации disabled
    // 0:'для 3 гостей', 1:'для 2 гостей' , 2:'для 1 гостя', 3:'не для гостей'
    var RoomCapacity = {
      '1': [true, true, false, true],
      '2': [true, false, false, true],
      '3': [false, false, false, true],
      '100': [true, true, true, false]
    };

    var countGuests = RoomCapacity[numberRooms];

    [].forEach.call(capacityInput, function (option, index) {
      option.disabled = countGuests[index];
      option.selected = !countGuests[index];
    });
  };

  var onRoomNumberChange = function () {
    getRoomCapacity();
  };

  getPriceInput();
  getRoomCapacity();

  adForm.addEventListener('invalid', onInvalidFieldsSelect, true);
  typeInput.addEventListener('change', onTypeInputChange);
  timeInInput.addEventListener('change', onTimeInInputChange);
  timeOutInput.addEventListener('change', onTimeOutInputChange);
  roomNumberInput.addEventListener('change', onRoomNumberChange);

  var avatarUploadInput = document.querySelector('.ad-form-header__input');
  var avatar = document.querySelector('.ad-form-header__preview');

  var photoUploadInput = document.querySelector('.ad-form__input');
  var photo = document.querySelector('.ad-form__photo-container');

  avatarUploadInput.addEventListener('change', window.upload(avatarUploadInput, avatar));
  photoUploadInput.addEventListener('change', window.upload(photoUploadInput, photo));
})();
