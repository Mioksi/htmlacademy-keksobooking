'use strict';

(function () {
  var main = document.querySelector('main');

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);

    var removeDialog = function () {
      success.remove();

      success.removeEventListener('click', onDialogClick);
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogClick = function (evt) {
      if (!evt.target.classList.contains('success__message')) {
        removeDialog();
      }
    };

    var onDialogEscPress = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    window.map.onDeactivate();

    success.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogEscPress);

    main.insertAdjacentElement('afterbegin', success);
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var removeDialog = function () {
      error.remove();

      error.removeEventListener('click', onDialogClick);
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogClick = function (evt) {
      if (!evt.target.classList.contains('error__message')) {
        removeDialog();
      }
    };

    var onDialogEscPress = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    error.querySelector('.error__message').textContent = errorMessage;

    error.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogEscPress);

    main.insertAdjacentElement('afterbegin', error);
  };

  window.dialog = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
