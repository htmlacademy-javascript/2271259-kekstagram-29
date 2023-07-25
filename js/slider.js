const defaultEffect = 'none';
const Effects = {
  none: {
    name: 'none',
    filter: () => '',
    min: 0,
    max: 0,
    start: 0,
    step: 1,
    unit: ''
  },

  chrome: {
    name: 'chrome',
    filter: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    start: 1,
    step: 0.1
  },

  sepia: {
    name: 'sepia',
    filter: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    start: 1,
    step: 0.1
  },

  marvin: {
    name: 'marvin',
    filter: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    start: 100,
    step: 1
  },

  phobos: {
    name: 'phobos',
    filter: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    start: 3,
    step: 0.1
  },

  heat: {
    name: 'heat',
    filter: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    start: 3,
    step: 0.1
  }
};

const previewImage = document.querySelector('.img-upload__preview img');
const effectElements = document.querySelector('.effects__item input');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');

const showSlider = () => effectSlider.classList.remove('hidden');
const hideSlider = () => effectSlider.classList.add('hidden');

const makeSliderOptions = (effect) => ({
  range: {
    min: effect.min,
    max: effect.max
  },
  start: effect.start,
  step: effect.step,
  connect: 'lower'
});

const applyEffect = (effect) => {
  if (effect) {
    effectSliderElement.noUiSlider.updateOptions(makeSliderOptions(effect));
    (effect.name === defaultEffect ? hideSlider : showSlider)();
    effectSliderElement.noUiSlider.off('slide');
    effectSliderElement.noUiSlider.on('slide', () => onSliderUpdate(effect));
    onSliderUpdate(effect);
  }
};

const resetEffects = () => applyEffect(Effects[defaultEffect]);
const onEffectsChange = (evt) => applyEffect(Effects[evt.target.value]);

function onSliderUpdate (effect) {
  const sliderValue = effectSliderElement.noUiSlider.get();
  previewImage.className = `effects__preview--${effect.name}`;
  previewImage.style.filter = effect.filter(sliderValue);
  effectsValue.value = sliderValue;
}

const slider = () => {
  noUiSlider.create(
    effectSliderElement,
    makeSliderOptions(Effects[defaultEffect])
  );
  effectElements.forEach((element) =>
    element.addEventListener('change', onEffectsChange)
  );
  resetEffects();
};

export { slider, resetEffects };
