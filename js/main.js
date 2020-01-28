'use strict';

var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var GUESTS = [0, 1, 2, 3];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_AMOUNT = 8;

var Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630
};
var ads = [];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomLengthArray = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length + 1);

  return array.slice(0, randomIndex);
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatarSrc = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

var createAdsArray = function (adsAmount) {
  for (var i = 0; i < adsAmount; i++) {
    var locationX = getRandomInteger(Pin.MIN_X, Pin.MAX_X) - Pin.WIDTH;
    var locationY = getRandomInteger(Pin.MIN_Y, Pin.MAX_Y) - Pin.HEIGHT;

    var ad = {
      author: {
        avatar: getAvatarSrc(i)
      },

      offer: {
        title: '',
        address: locationX + ', ' + locationY,
        price: getRandomInteger(0, MAX_PRICE),
        type: getRandomElement(TYPES),
        rooms: getRandomElement(ROOMS),
        guests: getRandomElement(GUESTS),
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomLengthArray(FEATURES),
        description: '',
        photos: getRandomLengthArray(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    ads.push(ad);
  }
};

var renderPin = function (ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x + 'px';
  adElement.style.top = ad.location.y + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;

  return adElement;
};

var renderAllPins = function (adsAmount) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsAmount; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

createAdsArray(ADS_AMOUNT);
renderAllPins(ADS_AMOUNT);

map.classList.remove('map--faded');
