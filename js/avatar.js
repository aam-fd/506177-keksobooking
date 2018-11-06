'use strict';

window.avatar = (function () {

  var fileChooser;
  var preview;

  var onFileChooserChange = function () {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  return function (loader, img) {
    fileChooser = loader;
    preview = img;

    fileChooser.addEventListener('change', onFileChooserChange);
  };

})();
