'use strict';

(function () {

  window.fileUpload = function (fileChooser, preview) {

    return function () {

      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = window.constants.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {

          var img;

          if (preview.childElementCount === 0) {
            img = document.createElement('img');
            img.width = '70';
            img.height = '70';
            img.src = reader.result;
            preview.appendChild(img);

          } else {
            img = preview.querySelector('img');
            img.src = reader.result;
          }

        });

        reader.readAsDataURL(file);
      }
    };
  };


})();
