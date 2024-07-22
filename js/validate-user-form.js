import { adForm, pricePerNight, sliderPricePerNight } from './constants.js';
import { getPricePerNightValue } from './sliderPricePerNight.js';
import { onSuccessCreatedAds, onErrorCreatedAds, blockFormSubmitButton } from './util.js';

import { removeImagePreview } from './upload-ad-photos.js';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'error__validate-user-form',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div'
});

function removeMessage() {
  adForm.querySelectorAll('.pristine-error').forEach((elem) => {
    elem.innerText = '';
  });
}

//*** Валидация заголовка объявления

function validateAdTitleLength(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateAdTitleLength,
  'Длина заголовка должна быть от 30 до 100 символов'
);

pristine.validate(validateAdTitleLength);

//*** Валидация цены за 1 ночь

function validateAdPrice(value) {
  return value <= 100000;
}
pristine.addValidator(
  adForm.querySelector('#price'),
  validateAdPrice,
  'Цена не более 100000 руб'
);

//*** Валидация - Поле «Количество комнат» синхронизировано с полем «Количество мест»

const roomsCount = adForm.querySelector('#room_number');
const seatsCount = adForm.querySelector('#capacity');

function validateRoomsOptions() {
  removeMessage();
  return (roomsCount.value >= seatsCount.value && roomsCount.value !== '100' && seatsCount.value !== '0') || (roomsCount.value === '100' && seatsCount.value === '0');
}

function getRoomsOptionErrorMessage() {
  if (roomsCount.value === '100' && seatsCount.value !== '0') {
    return `${roomsCount.value} комнат не предназназначены для гостей`;
  }

  if (roomsCount.value !== '100' && seatsCount.value === '0') {
    return (roomsCount.value === '1' ? `${roomsCount.value} комната предназначена только для гостей` : `${roomsCount.value} комнаты предназначены только для гостей`);
  }

  if (roomsCount.value < seatsCount.value && seatsCount.value !== '0') {
    return (roomsCount.value === '1' ? `${roomsCount.value} комната не подходит для ${seatsCount.value} гостей` : `${roomsCount.value} комнаты не подходят для ${seatsCount.value} гостей`);
  }
}

pristine.addValidator(roomsCount, validateRoomsOptions, getRoomsOptionErrorMessage);
pristine.addValidator(seatsCount, validateRoomsOptions, getRoomsOptionErrorMessage);

//*** Валидация - Поле «Тип жилья» синхронизировано с полем «Цена за ночь»

const typeHousing = adForm.querySelector('#type');

function getSliderPriceValue() {
  const sliderValue = getPricePerNightValue();
  return sliderValue;
}

const typeHousingPriceOptions = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function resetPriceInputValue() {
  pricePerNight.value = typeHousingPriceOptions[typeHousing.value];
  pricePerNight.placeholder = typeHousingPriceOptions[typeHousing.value];
  sliderPricePerNight.noUiSlider.set(typeHousingPriceOptions[typeHousing.value]);

  pristine.validate(typeHousing);
}

function validateTypeHousingPriceOptions() {
  return pricePerNight.value >= typeHousingPriceOptions[typeHousing.value];
}

function getTypeHousingPriceMessage() {
  return `Стоимость жилья
  ${typeHousing.options[typeHousing.selectedIndex].text}
   должна быть не менее ${typeHousingPriceOptions[typeHousing.value]} руб.`;
}

sliderPricePerNight.noUiSlider.on('update', () => {
  pricePerNight.value = getSliderPriceValue();
  pristine.validate(typeHousing);
});

typeHousing.addEventListener('change', resetPriceInputValue);

pristine.addValidator(typeHousing, validateTypeHousingPriceOptions, getTypeHousingPriceMessage);
pristine.addValidator(pricePerNight, validateTypeHousingPriceOptions, getTypeHousingPriceMessage);

//*** Поля «Время заезда» и «Время выезда»

const checkInTime = adForm.querySelector('[name="timein"]');
const departureTime = adForm.querySelector('[name="timeout"]');

checkInTime.addEventListener('change', () => {
  departureTime.value = checkInTime.value;
});

departureTime.addEventListener('change', () => {
  checkInTime.value = departureTime.value;
});

adForm.addEventListener('submit', (evt) => {

  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockFormSubmitButton();
    removeImagePreview();
    const formData = new FormData(evt.target);

    fetch(
      'https://25.javascript.htmlacademy.pro/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccessCreatedAds();
          adForm.reset();
        } else {
          onErrorCreatedAds();
        }
      });
  }
});

export { pricePerNight };
