'use strict';

(function () {
  var main = document.querySelector('main');

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    var removeDialog = function () {
      successElement.remove();

      successElement.addEventListener('click', onDialogClick);
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

    successElement.addEventListener('click', onDialogClick);
    document.addEventListener('keydown', onDialogEscPress);

    main.insertAdjacentElement('afterbegin', successElement);
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    var removeDialog = function () {
      errorElement.remove();

      errorElement.addEventListener('click', onDialogButtonClick);
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogButtonClick = function (evt) {
      if (evt.target.classList.contains('error__button')) {
        removeDialog();
      }
    };

    var onDialogEscPress = function (evt) {
      window.utils.isEscEvent(evt, removeDialog);
    };

    errorElement.querySelector('.error__message').textContent = errorMessage;

    errorElement.addEventListener('click', onDialogButtonClick);
    document.addEventListener('keydown', onDialogEscPress);

    main.insertAdjacentElement('afterbegin', errorElement);
  };

  window.dialog = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
