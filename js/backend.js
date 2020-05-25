'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  var setupLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case StatusCode.NOT_FOUND:
          onError('Ничего не найдено');
          break;

        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setupLoad(onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setupLoad(onLoad, onError);

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
