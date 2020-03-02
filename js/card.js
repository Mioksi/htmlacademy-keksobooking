'use strict';

(function () {
  var roomsDeclension = ['комната', 'комнаты', 'комнат'];
  var guestsDeclension = ['гостя', 'гостей', 'гостей'];

  var mapFiltersContainer = window.data.map.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var generateFeatures = function (features, cardItem) {
    var popupFeatures = cardItem.querySelector('.popup__features');
    var popupFeature = popupFeatures.querySelector('.popup__feature');

    popupFeatures.innerHTML = '';

    features.forEach(function (feature) {
      var featureItem = popupFeature.cloneNode(true);

      featureItem.className = 'popup__feature popup__feature--' + feature;

      popupFeatures.appendChild(featureItem);
    });

    if (features.length === 0) {
      popupFeatures.style.display = 'none';
    }
  };

  var generatePhotos = function (photos, cardItem) {
    var popupPhotos = cardItem.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    popupPhotos.innerHTML = '';

    photos.forEach(function (photo) {
      var photoItem = popupPhoto.cloneNode(true);

      photoItem.src = photo;

      popupPhotos.appendChild(photoItem);
    });

    if (photos.length === 0) {
      popupPhotos.style.display = 'none';
    }
  };

  var generateCard = function (card) {
    var cardItem = cardTemplate.cloneNode(true);
    var popupClose = cardItem.querySelector('.popup__close');
    var cardTitle = cardItem.querySelector('.popup__title');
    var cardAddress = cardItem.querySelector('.popup__text--address');
    var cardPrice = cardItem.querySelector('.popup__text--price');
    var cardType = cardItem.querySelector('.popup__type');
    var cardCapacity = cardItem.querySelector('.popup__text--capacity');
    var cardDescription = cardItem.querySelector('.popup__description');
    var cardTime = cardItem.querySelector('.popup__text--time');
    var cardAvatar = cardItem.querySelector('.popup__avatar');

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

    generateFeatures(card.offer.features, cardItem);
    generatePhotos(card.offer.photos, cardItem);

    popupClose.addEventListener('click', window.map.onCardRemove);
    document.addEventListener('keydown', window.map.onCardEscPress);

    return cardItem;
  };

  var renderCard = function (ad) {
    mapFiltersContainer.insertAdjacentElement('beforebegin', generateCard(ad));
  };

  window.card = {
    render: renderCard
  };
})();
