
import { sliderPricePerNight, pricePerNight } from './constants.js';

noUiSlider.create(sliderPricePerNight, {
  range: {
    min: 0,
    max: 100000
  },
  start: 1000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    },
  },
});

function getPricePerNightValue() {
  return (pricePerNight.value = sliderPricePerNight.noUiSlider.get());
}

export { getPricePerNightValue };
