'use strict';

(function () {
  var numberOfGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var adForm = document.querySelector('.ad-form');
  var selectRooms = adForm.querySelector('select[name=rooms]');
  var selectCapacity = adForm.querySelector('select[name=capacity]');
  var capacityOptions = selectCapacity.querySelectorAll('option');
  var typeOfHousing = adForm.querySelector('select[name=type]');
  var typeOptions = typeOfHousing.querySelectorAll('option');
  var priceInput = adForm.querySelector('input[name=price]');
  var selectCheckIn = adForm.querySelector('select[name=timein]');
  var selectCheckOut = adForm.querySelector('select[name=timeout]');

  var validateRooms = function () {
    var roomValue = selectRooms.value;

    capacityOptions.forEach(function (option) {
      option.selected = numberOfGuests[roomValue][0] === option.value;
      option.disabled = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
    });
  };

  var validateMinPrice = function () {
    var indexSelected = typeOfHousing.selectedIndex;
    var activeTypeOption = typeOptions[indexSelected];
    var housingMinPrice = window.card.housingInfo[activeTypeOption.value].minPrice;

    priceInput.min = housingMinPrice;
    priceInput.placeholder = housingMinPrice;
  };

  var onRoomNumberChange = function () {
    validateRooms();
  };

  var onTypeHousingChange = function () {
    validateMinPrice();
  };

  var onCheckInChange = function () {
    selectCheckIn.value = selectCheckOut.value;
  };

  var onCheckOutChange = function () {
    selectCheckOut.value = selectCheckIn.value;
  };

  var addValidation = function () {
    validateRooms();
    validateMinPrice();

    selectRooms.addEventListener('change', onRoomNumberChange);
    typeOfHousing.addEventListener('change', onTypeHousingChange);
    selectCheckIn.addEventListener('change', onCheckOutChange);
    selectCheckOut.addEventListener('change', onCheckInChange);
  };

  window.form = {
    addValidation: addValidation
  };
})();
