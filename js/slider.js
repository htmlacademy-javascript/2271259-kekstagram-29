import { show, hide } from './utile.js';
// const Effects = {
//   none: {
//     name: 'none',
//     filter: () => '',
//     min: 0,
//     max: 0,
//     start: 0,
//     step: 1,
//     unit: ''
//   },

//   chrome: {
//     name: 'chrome',
//     filter: (value) => `grayscale(${value})`,
//     min: 0,
//     max: 1,
//     start: 1,
//     step: 0.1
//   },

//   sepia: {
//     name: 'sepia',
//     filter: (value) => `sepia(${value})`,
//     min: 0,
//     max: 1,
//     start: 1,
//     step: 0.1
//   },

//   marvin: {
//     name: 'marvin',
//     filter: (value) => `invert(${value}%)`,
//     min: 0,
//     max: 100,
//     start: 100,
//     step: 1
//   },

//   phobos: {
//     name: 'phobos',
//     filter: (value) => `blur(${value}px)`,
//     min: 0,
//     max: 3,
//     start: 3,
//     step: 0.1
//   },

//   heat: {
//     name: 'heat',
//     filter: (value) => `brightness(${value})`,
//     min: 1,
//     max: 3,
//     start: 3,
//     step: 0.1
//   }
// };

// const previewImage = document.querySelector('.img-upload__preview img');
// const effectElements = document.querySelector('.effects__item input');
// const effectSlider = document.querySelector('.img-upload__effect-level');
// const effectSliderElement = document.querySelector('effect-level__slider');
// const effectsValue = document.querySelector('.effect-level__value');

// const showSlider = () => effectSlider.classList.remove('hidden');
// const hideSlider = () => effectSlider.classList.add('hidden');

// const makeSliderOptions = (effect) => ({
//   range: {
//     min: effect.min,
//     max: effect.max
//   },
//   start: effect.start,
//   step: effect.step,
//   connect: 'lower'
// });

// const applyEffect = (effect) => {
//   if (effect) {
//     effectSliderElement.noUiSlider.updateOptions(makeSliderOptions(effect));
//     (effect.name === defaultEffect ? hideSlider : showSlider)();
//     effectSliderElement.noUiSlider.off('slide');
//     effectSliderElement.noUiSlider.on('slide', () => onSliderUpdate(effect));
//     onSliderUpdate(effect);
//   }
// };

// const resetEffects = () => applyEffect(Effects[defaultEffect]);
// const onEffectsChange = (evt) => applyEffect(Effects[evt.target.value]);

// function onSliderUpdate (effect) {
//   const sliderValue = effectSliderElement.noUiSlider.get();
//   previewImage.className = `effects__preview--${effect.name}`;
//   previewImage.style.filter = effect.filter(sliderValue);
//   effectsValue.value = sliderValue;
// }

// const slider = () => {
//   noUiSlider.create(
//     effectSliderElement,
//     makeSliderOptions(Effects[defaultEffect])
//   );
//   effectElements.forEach((element) =>
//     element.addEventListener('change', onEffectsChange)
//   );
//   resetEffects();
// };

// export { slider, resetEffects };

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
