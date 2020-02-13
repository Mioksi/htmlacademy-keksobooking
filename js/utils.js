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

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getDeclension = function (number, nouns) {
    var n = number % 10;
    var n2 = number % 100;

    if (n === 0 || n2 > 4 && n2 < 20) {
      return number + ' ' + nouns[2];
    } else if (n === 1) {
      return number + ' ' + nouns[0];
    } else if (n > 1 && n < 5) {
      return number + ' ' + nouns[1];
    }

    return number + ' ' + nouns[2];
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    getDeclension: getDeclension
  };
})();
