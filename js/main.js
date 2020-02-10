'use strict';

var ADS_AMOUNT = 8;
var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var GUESTS = [0, 1, 2, 3];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LEFT_BUTTON_MOUSE = 1;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630
};
var PinMain = {
  WIDTH: 62,
  HEIGHT: 62,
  X: 570,
  Y: 375
};
var typesOfHousing = {
  bungalo: {
    ru: 'Бунгало',
    minPrice: '0'
  },
  flat: {
    ru: 'Квартира',
    minPrice: '1000'
  },
  house: {
    ru: 'Дом',
    minPrice: '5000'
  },
  palace: {
    ru: 'Дворец',
    minPrice: '10000'
  }
};
var numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
var ads = [];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var formElements = document.querySelectorAll('.map__filter, fieldset');

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters-container');

var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('input[name=address]');
var selectRooms = adForm.querySelector('select[name=rooms]');
var selectCapacity = adForm.querySelector('select[name=capacity]');
var capacityOptions = selectCapacity.querySelectorAll('option');
var typeOfHousing = adForm.querySelector('select[name=type]');
var typeOptions = typeOfHousing.querySelectorAll('option');
var priceInput = adForm.querySelector('input[name=price]');
var selectCheckIn = adForm.querySelector('select[name=timein]');
var selectCheckOut = adForm.querySelector('select[name=timeout]');

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
    var locationX = getRandomInteger(Pin.MIN_X, Pin.MAX_X);
    var locationY = getRandomInteger(Pin.MIN_Y, Pin.MAX_Y);

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

var generatePin = function (ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x - Pin.WIDTH / 2 + 'px';
  adElement.style.top = ad.location.y - Pin.HEIGHT + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;

  adElement.addEventListener('click', function () {
    onAdOpen(ad);
  });
  adElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      onAdOpen(ad);
    }
  });

  return adElement;
};

var renderAllPins = function (adsAmount) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsAmount; i++) {
    fragment.appendChild(generatePin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

var generateFeatures = function (features, cardElement) {
  var popupFeatures = cardElement.querySelector('.popup__features');
  var popupFeature = popupFeatures.querySelector('.popup__feature');

  popupFeatures.innerHTML = '';

  features.forEach(function (feature) {
    var featureElement = popupFeature.cloneNode(true);

    featureElement.className = 'popup__feature popup__feature--' + feature;

    popupFeatures.appendChild(featureElement);
  });
};

var generatePhotos = function (photos, cardElement) {
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');

  popupPhotos.innerHTML = '';

  photos.forEach(function (photo) {
    var photoElement = popupPhoto.cloneNode(true);

    photoElement.src = photo;

    popupPhotos.appendChild(photoElement);
  });
};

var generateCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var popupClose = cardElement.querySelector('.popup__close');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesOfHousing[card.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  generateFeatures(card.offer.features, cardElement);
  generatePhotos(card.offer.photos, cardElement);

  popupClose.addEventListener('click', onCardRemove);
  document.addEventListener('keydown', onCardEscPress);

  return cardElement;
};

var renderCard = function (ad) {
  mapFilters.insertAdjacentElement('beforebegin', generateCard(ad));
};

var toggleDisabledElements = function () {
  formElements.forEach(function (formElement) {
    formElement.disabled = !formElement.disabled;
  });
};

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  createAdsArray(ADS_AMOUNT);
  renderAllPins(ADS_AMOUNT);
  toggleDisabledElements();
  getAddressValue();
  validateRooms();
  validateMinPrice();

  selectRooms.addEventListener('change', onRoomNumberChange);
  typeOfHousing.addEventListener('change', onTypeHousingChange);
  selectCheckIn.addEventListener('change', onCheckOutChange);
  selectCheckOut.addEventListener('change', onCheckInChange);
  mapPinMain.removeEventListener('mousedown', onPinClick);
  mapPinMain.removeEventListener('keydown', onPinEnterPress);
};

var getPinCoordinates = function () {
  var x = map.classList.contains('map--faded') ? PinMain.X + PinMain.WIDTH / 2 : PinMain.X + Pin.WIDTH / 2;
  var y = map.classList.contains('map--faded') ? PinMain.Y + PinMain.HEIGHT / 2 : PinMain.Y + Pin.HEIGHT;

  return x + ', ' + y;
};

var getAddressValue = function () {
  adFormAddress.value = getPinCoordinates();
};

var validateRooms = function () {
  var roomValue = selectRooms.value;

  capacityOptions.forEach(function (option) {
    option.selected = numberOfGuests[roomValue][0] === option.value;
    option.disabled = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
  });
};

var validateMinPrice = function () {
  var indexSelected = typeOfHousing.selectedIndex;
  var activeTypeOption = typeOptions[indexSelected];
  var housingMinPrice = typesOfHousing[activeTypeOption.value].minPrice;

  priceInput.min = housingMinPrice;
  priceInput.placeholder = housingMinPrice;
};

var onRoomNumberChange = function () {
  validateRooms();
};

var onTypeHousingChange = function () {
  validateMinPrice();
};

var onCheckInChange = function () {
  selectCheckIn.value = selectCheckOut.value;
};

var onCheckOutChange = function () {
  selectCheckOut.value = selectCheckIn.value;
};

var onPinClick = function (evt) {
  if (evt.which === LEFT_BUTTON_MOUSE) {
    activateMap();
  }
};

var onPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
};

var onCardEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    onCardRemove();
  }
};

var onAdOpen = function (ad) {
  onCardRemove();
  renderCard(ad);
};

var onCardRemove = function () {
  var card = map.querySelector('.map__card');

  if (card) {
    var popupClose = card.querySelector('.popup__close');

    card.remove();

    popupClose.removeEventListener('click', onCardRemove);
    document.removeEventListener('keydown', onCardEscPress);
  }
};

toggleDisabledElements();
getAddressValue();

mapPinMain.addEventListener('mousedown', onPinClick);
mapPinMain.addEventListener('keydown', onPinEnterPress);
