'use strict';

(function () {
  var ADS_AMOUNT = 8;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createAdsArray = function (adsAmount) {
    var ads = [];

    for (var i = 0; i < adsAmount; i++) {
      var ad = window.data.generateAd(i);

      ads.push(ad);
    }

    return ads;
  };

  var ads = createAdsArray(ADS_AMOUNT);

  var generatePin = function (ad) {
    var adElement = pinTemplate.cloneNode(true);

    adElement.style.left = ad.location.x - Pin.WIDTH / 2 + 'px';
    adElement.style.top = ad.location.y - Pin.HEIGHT + 'px';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;

    adElement.addEventListener('click', function () {
      window.map.onAdOpen(ad);

      adElement.classList.add('map__pin--active');
    });
    adElement.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, window.map.onAdOpen, ad);
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

  window.pin = {
    render: renderAllPins
  };
})();
