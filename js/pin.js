'use strict';

(function () {
  var ADS_AMOUNT = 5;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (ad) {
    var advertItem = pinTemplate.cloneNode(true);

    advertItem.style.left = ad.location.x - Pin.WIDTH / 2 + 'px';
    advertItem.style.top = ad.location.y - Pin.HEIGHT + 'px';
    advertItem.querySelector('img').src = ad.author.avatar;
    advertItem.querySelector('img').alt = ad.offer.title;

    advertItem.addEventListener('click', function () {
      window.map.onAdOpen(ad);

      advertItem.classList.add('map__pin--active');
    });
    advertItem.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, window.map.onAdOpen, ad);
    });

    return advertItem;
  };

  var renderAllPins = function (ads) {
    var fragment = document.createDocumentFragment();
    var filteredAds = window.filter(ads).slice(0, ADS_AMOUNT);

    filteredAds.forEach(function (ad) {
      if (ad.offer) {
        fragment.appendChild(generatePin(ad));
      }
    });

    window.data.mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderAllPins
  };
})();
