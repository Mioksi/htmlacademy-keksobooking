'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var filterHousing = function (data, filterElement) {
    return filterElement.value === 'any' ? true : data === filterElement.value;
  };

  window.filter = function (ads) {
    return ads.filter(function (element) {
      return filterHousing(element.offer.type, housingType);
    });
  };
})();
