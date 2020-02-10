'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action, parametr) {
    if (evt.key === ENTER_KEY) {
      action(parametr);
    }
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomLengthArray = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length + 1);

    return array.slice(0, randomIndex);
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getRandomLengthArray: getRandomLengthArray
  };
})();
