'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';

  var onError = function () {
    var errorTemplate = document.querySelector('#error')
                                .content
                                .querySelector('.error');

    var error = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');

    main.appendChild(error);
  };

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }

    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('GET', URL);
    xhr.send();

  };
})();
