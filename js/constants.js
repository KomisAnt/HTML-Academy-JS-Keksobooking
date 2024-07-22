const adForm = document.querySelector('.ad-form');
const sliderPricePerNight = adForm.querySelector('.ad-form__slider');
const pricePerNight = adForm.querySelector('#price');

const adFormInputs = adForm.querySelectorAll('input');
const adFormTextarea = adForm.querySelector('textarea');
const adFormSelects = adForm.querySelectorAll('select');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelets = mapFilters.querySelectorAll('select');

const addressField = adForm.querySelector('[name="address"]');

const adFormSubmitButton = document.querySelector('.ad-form__submit');

const realtyPriceLow = 9999; //REALTY_PRICE_LOW
const realtyPriceMiddle = 50000;
const realtyPriceHigh = 50001;

const mapPinMainLat = 35.67788;
const mapPinMainLng = 139.75084;

const RERENDER_DELAY = 500;

export {
  adForm,
  sliderPricePerNight,
  pricePerNight,
  adFormInputs,
  adFormTextarea,
  adFormSelects,
  mapFilters,
  mapFiltersSelets,
  realtyPriceLow,
  realtyPriceMiddle,
  realtyPriceHigh,
  addressField,
  adFormSubmitButton,
  RERENDER_DELAY,
  mapPinMainLat,
  mapPinMainLng
};
