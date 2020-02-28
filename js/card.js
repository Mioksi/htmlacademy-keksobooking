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

    if (features.length === 0) {
      popupFeatures.style.display = 'none';
    }
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

    if (photos.length === 0) {
      popupPhotos.style.display = 'none';
    }
  };

  var generateCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    if (card.offer.title !== '') {
      cardTitle.textContent = card.offer.title;
    } else {
      cardTitle.style.display = 'none';
    }

    if (card.offer.address !== '') {
      cardAddress.textContent = card.offer.address;
    } else {
      cardAddress.style.display = 'none';
    }

    if (card.offer.price !== '') {
      cardPrice.textContent = card.offer.price + '₽/ночь';
    } else {
      cardPrice.style.display = 'none';
    }

    if (card.offer.type !== '') {
      cardType.textContent = window.data.housingInfo[card.offer.type].ru;
    } else {
      cardType.style.display = 'none';
    }

    if (card.offer.rooms !== '' && card.offer.guests !== '') {
      cardCapacity.textContent = window.utils.getDeclension(card.offer.rooms, roomsDeclension) + ' для ' + window.utils.getDeclension(card.offer.guests, guestsDeclension);
    } else {
      cardCapacity.style.display = 'none';
    }

    if (card.offer.checkin !== '' && card.offer.checkout !== '') {
      cardTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      cardTime.style.display = 'none';
    }

    if (card.offer.description !== '') {
      cardDescription.textContent = card.offer.description;
    } else {
      cardDescription.style.display = 'none';
    }

    if (card.author.avatar !== '') {
      cardAvatar.src = card.author.avatar;
    } else {
      cardAvatar.style.display = 'none';
    }

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
