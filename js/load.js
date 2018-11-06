'use strict';

window.load = (function (type, onSuccess, onError, method, url, sendElement) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = type;

  xhr.addEventListener('load', function () {
    if (xhr.status === window.constants.CodeStatus.OK) {
      onSuccess(xhr.response);
    } else {
      onError();
    }

  });

  xhr.addEventListener('error', function () {
    onError();
  });

  xhr.open(method, url);
  xhr.send(sendElement);

});
