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

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');

  var getPinCoordinates = function () {
    var coordinateX = parseInt(mapPinMain.style.left, 10);
    var coordinateY = parseInt(mapPinMain.style.top, 10);

    var x = map.classList.contains('map--faded') ? PinMain.X + Math.floor(PinMain.WIDTH / 2) : coordinateX + Math.floor(Pin.WIDTH / 2);
    var y = map.classList.contains('map--faded') ? PinMain.Y + Math.floor(PinMain.HEIGHT / 2) : coordinateY + Pin.HEIGHT;

    return [x, y];
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

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.backend.load(window.pin.onSuccess, window.backend.onError);
    window.form.toggleDisabledElements();
    window.form.getAddressValue(getPinCoordinates());
    window.form.addValidation();

    mapPinMain.removeEventListener('keydown', onPinEnterPress);
  };

  window.form.toggleDisabledElements();
  window.form.getAddressValue(getPinCoordinates());

  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keydown', onPinEnterPress);

  window.map = {
    onAdOpen: onAdOpen,
    onCardRemove: onCardRemove,
    onCardEscPress: onCardEscPress
  };
})();
