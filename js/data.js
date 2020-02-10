'use strict';

(function () {
  var MAX_PRICE = 1000000;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var GUESTS = [0, 1, 2, 3];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var Pin = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var getAvatarSrc = function (index) {
    return 'img/avatars/user0' + (index + 1) + '.png';
  };

  var generateAd = function (i) {
    var locationX = window.utils.getRandomInteger(Pin.MIN_X, Pin.MAX_X);
    var locationY = window.utils.getRandomInteger(Pin.MIN_Y, Pin.MAX_Y);

    var ad = {
      author: {
        avatar: getAvatarSrc(i)
      },

      offer: {
        title: '',
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomInteger(0, MAX_PRICE),
        type: window.utils.getRandomElement(TYPES),
        rooms: window.utils.getRandomElement(ROOMS),
        guests: window.utils.getRandomElement(GUESTS),
        checkin: window.utils.getRandomElement(TIMES),
        checkout: window.utils.getRandomElement(TIMES),
        features: window.utils.getRandomLengthArray(FEATURES),
        description: '',
        photos: window.utils.getRandomLengthArray(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    return ad;
  };

  window.data = {
    generateAd: generateAd
  };
})();
