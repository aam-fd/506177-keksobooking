'use strict';

(function () {

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var coords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: coords.x - moveEvt.pageX,
        y: coords.y - moveEvt.pageY
      };

      coords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (moveEvt.pageX > window.map.area.getBoundingClientRect().left + window.constants.MainPin.WIDTH / 2 &&
          moveEvt.pageX < window.map.area.getBoundingClientRect().right - window.constants.MainPin.WIDTH / 2 &&
          moveEvt.pageY > window.constants.Position.MIN_Y &&
          moveEvt.pageY < window.constants.Position.MAX_Y) {

        window.form.fillAddress(window.map.mainPin, window.constants.MainPin);

        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';

      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      stopMove();

      window.form.fillAddress(window.map.mainPin, window.constants.MainPin);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    var stopMove = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  };

  window.map.mainPin.addEventListener('mousedown', onMouseDown);

})();
