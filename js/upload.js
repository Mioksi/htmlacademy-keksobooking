'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var PICTURE_SIZE = 70;

  var adForm = document.querySelector('.ad-form');
  var pinAvatar = adForm.querySelector('.ad-form-header__preview img');

  var housingPicture = adForm.querySelector('.ad-form__photo');

  var loadPicture = function (evt, picture) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarLoad = function (evt) {
    loadPicture(evt, pinAvatar);
  };

  var onPictureLoad = function (evt) {
    var housingImg = document.createElement('img');

    housingImg.width = PICTURE_SIZE;
    housingImg.height = PICTURE_SIZE;

    housingPicture.appendChild(housingImg);

    loadPicture(evt, housingImg);
  };

  var resetPictures = function () {
    pinAvatar.src = 'img/muffin-grey.svg';
    housingPicture.innerHTML = '';
  };

  window.upload = {
    onAvatarLoad: onAvatarLoad,
    onPictureLoad: onPictureLoad,
    resetPictures: resetPictures
  };
})();
