'use strict';

window.load = (function (type, onSuccess, onError, method, url, sendElement) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = type;

  xhr.addEventListener('load', function () {
    return xhr.status === window.constants.CodeStatus.OK ?
      onSuccess(xhr.response) :
      onError;

  });

  xhr.addEventListener('error', function () {
    onError();
  });

  xhr.open(method, url);
  xhr.send(sendElement);

});
