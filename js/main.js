'use strict';

(function () {

  window.map.setDisabled();
  window.form.fillAddressDisabledField();
  window.form.getPriceInput();
  window.form.getRoomCapacity();

  window.map.mainPin.addEventListener('mouseup', window.map.onMainPinFirstMouseUp);
  window.map.mainPin.addEventListener('mousedown', window.dragNDrop.onMainPinMouseDown);

  window.form.adForm.addEventListener('invalid', window.form.onInvalidFieldsSelect, true);
  window.form.typeInput.addEventListener('change', window.form.onTypeInputChange);
  window.form.timeInInput.addEventListener('change', window.form.onTimeInInputChange);
  window.form.timeOutInput.addEventListener('change', window.form.onTimeOutInputChange);
  window.form.roomNumberInput.addEventListener('change', window.form.onRoomNumberChange);

})();
