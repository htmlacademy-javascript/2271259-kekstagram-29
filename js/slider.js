import { show, hide } from './utils.js';

const sliderConfigs = {
  chrome: {
    option: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: (value) => value.toFixed(2),
        from: (value) => parseFloat(value),
      },
    },
    filter: 'grayscale',
  },
  sepia: {
    option: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: (value) => value.toFixed(2),
        from: (value) => parseFloat(value),
      },
    },
    filter: 'sepia',
  },
  marvin: {
    option: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      format: {
        to: (value) => `${value}%`,
        from: (value) => parseFloat(value),
      },
    },
    filter: 'invert',
  },
  phobos: {
    option: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to: (value) => Number.isInteger(value)
          ? `${value.toFixed(0)}px`
          : `${value.toFixed(1)}px`,
        from: (value) => parseFloat(value),
      },
    },
    filter: 'blur',
  },
  heat: {
    option: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to: (value) =>value.toFixed(2),
        from: (value) => parseFloat(value),
      },
    },
    filter: 'brightness',
  },
};

const createSlider = (slider) => {
  noUiSlider.create(slider, {
    range: {
      'min': 0,
      'max': 0,
    },
    start: 0,
    connect: 'lower',
  });
};

const onSliderUpdate = (input, image, values, handle) => {
  const newValue = values[handle];
  const newFilterValue = image.style.filter.replace(/\(.*\)/, `(${newValue})`);

  input.value = newValue.toString();
  image.style.filter = newFilterValue;
};

function onRadioButtonChange(input, slider, sliderContainer, image) {
  const { option = null, filter } = sliderConfigs[this.value] ?? {};

  if (option) {
    image.style.setProperty('filter', `${filter}()`);
    slider.noUiSlider.updateOptions(option);
    show(sliderContainer);
  } else {
    hide(sliderContainer);
    image.style.removeProperty('filter');
    input.value = '';
  }
}

const createFormSlider = (form, image) => {
  const effectInput = form.querySelector('.effect-level__value');
  const sliderContainer = form.querySelector('.img-upload__effect-level');
  const slider = form.querySelector('.effect-level__slider');
  const radioButtons = form.querySelectorAll('.effects__radio');

  createSlider(slider);

  slider.noUiSlider.on('update', onSliderUpdate.bind(null, effectInput, image));

  radioButtons.forEach((radioButton) =>
    radioButton.addEventListener('change', onRadioButtonChange.bind(
      radioButton,
      effectInput,
      slider,
      sliderContainer,
      image
    )));

  return {
    reset() {
      image.style.removeProperty('filter');
      hide(sliderContainer);
    },
  };
};

export { createFormSlider };
