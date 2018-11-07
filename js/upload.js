'use strict';

(function () {

  window.upload = function (fileChooser, preview) {

    return function () {

      var readPhotoFile = function (file) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {

          var img;
          if (preview.querySelector('img') !== null) {
            img = window.util.createImgPhotoContainer();
            img.src = reader.result;
            var div = document.createElement('div');
            div.classList.add('ad-form__photo');
            div.appendChild(img);
            preview.appendChild(div);

          } else {
            img = window.util.createImgPhotoContainer();
            img.src = reader.result;
            preview.querySelector('.ad-form__photo').appendChild(img);
          }
        });
        reader.readAsDataURL(file);
      };

      var readAvatarFile = function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var img = preview.querySelector('img');
          img.src = reader.result;
        });
        reader.readAsDataURL(file);
      };

      var renderFile = function (readFile, file) {
        var fileName = file.name.toLowerCase();
        var matches = window.constants.FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          readFile(file);
        }
      };

      var photo = fileChooser.files[0];

      if (fileChooser.classList.contains('ad-form-header__input')) {
        renderFile(readAvatarFile, photo);
      }

      if (fileChooser.classList.contains('ad-form__input')) {
        renderFile(readPhotoFile, photo);
      }

    };
  };

})();
