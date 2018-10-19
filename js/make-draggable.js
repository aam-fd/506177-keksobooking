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
      var areaCoordsRight = areaCoords.right - elementSize.WIDTH / 2;
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

      if (pageX > areaCoordsLeft &&
            pageX < areaCoordsRight &&
            pageY > areaCoordsTop &&
            pageY < areaCoordsBottom) {

        callback(element, elementSize);

        element.style.left = (element.offsetLeft - shift.x) + 'px';
        element.style.top = (element.offsetTop - shift.y) + 'px';

      }
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
