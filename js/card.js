'use strict';

(function () {
  var roomsDeclension = ['комната', 'комнаты', 'комнат'];
  var guestsDeclension = ['гостя', 'гостей', 'гостей'];

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
    cardElement.querySelector('.popup__type').textContent = window.data.housingInfo[card.offer.type].ru;
    cardElement.querySelector('.popup__text--capacity').textContent = window.utils.getDeclension(card.offer.rooms, roomsDeclension) + ' для ' + window.utils.getDeclension(card.offer.guests, guestsDeclension);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    generateFeatures(card.offer.features, cardElement);
    generatePhotos(card.offer.photos, cardElement);

    popupClose.addEventListener('click', window.map.onCardRemove);
    document.addEventListener('keydown', window.map.onCardEscPress);

    return cardElement;
  };

  var renderCard = function (ad) {
    mapFilters.insertAdjacentElement('beforebegin', generateCard(ad));
  };

  window.card = {
    render: renderCard
  };
})();
