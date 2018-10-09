'use strict';

(function () {

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var coords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMainPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: coords.x - moveEvt.pageX,
        y: coords.y - moveEvt.pageY
      };

      coords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (moveEvt.pageX > window.map.map.getBoundingClientRect().left + window.map.MainPin.WIDTH / 2 &&
          moveEvt.pageX < window.map.map.getBoundingClientRect().right - window.map.MainPin.WIDTH / 2 &&
          moveEvt.pageY > window.data.Position.MIN_Y &&
          moveEvt.pageY < window.data.Position.MAX_Y) {

        window.form.fillAddressActiveField();

        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';

      }
    };

    var onMainPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      stopMoveMainPin();

      window.form.fillAddressActiveField();
    };

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);

    var stopMoveMainPin = function () {
      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };
  };


  window.dragNDrop = {
    onMainPinMouseDown: onMainPinMouseDown,
  };

})();
