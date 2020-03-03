'use strict';

(function () {
  var housingInfo = {
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

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapPins = map.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');

  window.data = {
    housingInfo: housingInfo,
    map: map,
    mapFilters: mapFilters,
    mapPins: mapPins,
    adForm: adForm
  };
})();
