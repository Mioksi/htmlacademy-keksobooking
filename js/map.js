'use strict';

(function () {
  var LEFT_BUTTON_MOUSE = 1;

  var Pin = {
    WIDTH: 65,
    HEIGHT: 82,
    MIN_X: 1,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var PinMain = {
    WIDTH: 65,
    HEIGHT: 65,
    X: 570,
    Y: 375
  };

  var ads = [];

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters');

  var adForm = document.querySelector('.ad-form');
  var formReset = adForm.querySelector('.ad-form__reset');
  var avatarChooser = adForm.querySelector('.ad-form-header__input');
  var pictureChooser = adForm.querySelector('.ad-form__input');

  var getPinCoordinates = function () {
    var coordinateX = parseInt(mapPinMain.style.left, 10);
    var coordinateY = parseInt(mapPinMain.style.top, 10);

    var x = map.classList.contains('map--faded') ? PinMain.X + Math.floor(PinMain.WIDTH / 2) : coordinateX + Math.floor(Pin.WIDTH / 2);
    var y = map.classList.contains('map--faded') ? PinMain.Y + Math.floor(PinMain.HEIGHT / 2) : coordinateY + Pin.HEIGHT;

    return [x, y];
  };

  var setDefaultPinMain = function () {
    mapPinMain.style.left = PinMain.X + 'px';
    mapPinMain.style.top = PinMain.Y + 'px';

    window.form.getAddressValue(getPinCoordinates());
  };

  var onPinClick = function (evt) {
    evt.preventDefault();

    if (evt.which === LEFT_BUTTON_MOUSE) {
      if (map.classList.contains('map--faded')) {
        activateMap();
      }

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var minCoordsX = Pin.MIN_X - PinMain.WIDTH / 2;
        var maxCoordsX = map.offsetWidth - PinMain.WIDTH / 2;
        var minCoordsY = Pin.MIN_Y - Pin.HEIGHT;
        var maxCoordsY = Pin.MAX_Y - Pin.HEIGHT;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

        if (mapPinMain.offsetLeft < minCoordsX) {
          mapPinMain.style.left = minCoordsX + 'px';
        } else if (mapPinMain.offsetLeft > maxCoordsX) {
          mapPinMain.style.left = maxCoordsX + 'px';
        }

        if (mapPinMain.offsetTop < minCoordsY) {
          mapPinMain.style.top = minCoordsY + 'px';
        } else if (mapPinMain.offsetTop > maxCoordsY) {
          mapPinMain.style.top = maxCoordsY + 'px';
        }

        window.form.getAddressValue(getPinCoordinates());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onPinEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, activateMap);
  };

  var onAdOpen = function (ad) {
    onCardRemove();
    window.card.render(ad);
  };

  var onCardEscPress = function (evt) {
    window.utils.isEscEvent(evt, onCardRemove);
  };

  var removeActivePin = function () {
    var pinActive = mapPins.querySelector('.map__pin--active');

    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  var onCardRemove = function () {
    var card = map.querySelector('.map__card');

    if (card) {
      var popupClose = card.querySelector('.popup__close');

      card.remove();
      removeActivePin();

      popupClose.removeEventListener('click', onCardRemove);
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var removeAllPins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onFilterChange = window.debounce(function () {
    removeAllPins();
    onCardRemove();

    window.pin.render(ads);
  });

  var onSuccess = function (data) {
    ads = data;

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.pin.render(data);
    window.form.toggleDisabledElements();
    window.form.getAddressValue(getPinCoordinates());
    window.form.addValidation();

    mapFilters.addEventListener('change', onFilterChange);
    avatarChooser.addEventListener('change', window.upload.onAvatarLoad);
    pictureChooser.addEventListener('change', window.upload.onPictureLoad);
    adForm.addEventListener('submit', window.form.onSubmit);
    formReset.addEventListener('click', onMapDeactivate);
    mapPinMain.removeEventListener('keydown', onPinEnterPress);
  };

  var activateMap = function () {
    window.backend.load(onSuccess, window.dialog.onError);
  };

  var onMapDeactivate = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.form.toggleDisabledElements();
    adForm.reset();
    mapFilters.reset();
    setDefaultPinMain();
    removeAllPins();
    onCardRemove();
    window.form.removeValidation();
    window.upload.resetPictures();

    mapFilters.removeEventListener('change', onFilterChange);
    avatarChooser.removeEventListener('change', window.upload.onAvatarLoad);
    pictureChooser.removeEventListener('change', window.upload.onPictureLoad);
    adForm.removeEventListener('submit', window.form.onSubmit);
    formReset.removeEventListener('click', onMapDeactivate);
  };

  window.form.getAddressValue(getPinCoordinates());

  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keydown', onPinEnterPress);

  window.map = {
    onAdOpen: onAdOpen,
    onCardRemove: onCardRemove,
    onCardEscPress: onCardEscPress,
    onMapDeactivate: onMapDeactivate
  };
})();
