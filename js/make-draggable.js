'use strict';

window.makeDraggable = (function () {

  var element;
  var elementSize;
  var callback;
  var area;
  var areaSize;

  var onMouseDown = function (evt) {

    evt.preventDefault();

    var coords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var areaCoords = area.getBoundingClientRect();
      var areaCoordsLeft = areaCoords.left + elementSize.WIDTH / 2;
      var areaCoordsRight = areaCoords.right;
      var areaCoordsTop = areaSize.MIN_Y;
      var areaCoordsBottom = areaSize.MAX_Y;

      var pageX = moveEvt.pageX;
      var pageY = moveEvt.pageY;

      var shift = {
        x: coords.x - pageX,
        y: coords.y - pageY
      };

      coords = {
        x: pageX,
        y: pageY
      };

      var pinPositionX = element.offsetLeft - shift.x;
      var pinPositionY = element.offsetTop - shift.y;

      if (pageX < areaCoordsLeft) {
        pinPositionX = -elementSize.WIDTH / 2;
      }

      if (pageX > areaCoordsRight) {
        pinPositionX = areaCoordsRight - elementSize.WIDTH / 2;
      }

      if (element.offsetTop > areaCoordsBottom - elementSize.HEIGHT) {
        pinPositionY = areaSize.MAX_Y - elementSize.HEIGHT; // 546
      }

      if (element.offsetTop < areaCoordsTop - elementSize.HEIGHT) {
        pinPositionY = areaSize.MIN_Y - elementSize.HEIGHT; // 46
      }

      callback(element, elementSize);
      element.style.left = pinPositionX + 'px';
      element.style.top = pinPositionY + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      stopMove();

      callback(element, elementSize);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    var stopMove = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  };

  return function (elem, elemSize, zone, zoneSize, cb) {

    element = elem;
    elementSize = elemSize;
    area = zone;
    areaSize = zoneSize;
    callback = cb;

    element.addEventListener('mousedown', onMouseDown);

  };

})();
