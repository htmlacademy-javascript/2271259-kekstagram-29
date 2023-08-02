const SCALE_INITIAL = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const onScaleUpButtonClick = (...parameters) => changeScale('up', ...parameters);

const onScaleDownButtonClick = (...parameters) => changeScale('down', ...parameters);

let transformValue = '';

function changeScale(direction, input, image) {
  let newValue = parseInt(input.value, 10);
  newValue += direction === 'up' ? SCALE_INITIAL : -SCALE_INITIAL;

  if (newValue >= SCALE_MIN && newValue <= SCALE_MAX) {
    transformValue = newValue / 100;

    input.value = `${newValue}%`;
    image.style.transform = `scale(${transformValue})`;
  }
}

const createFormScaling = (form, image) => {
  const scaleUpButton = form.querySelector('.scale__control--bigger');
  const scaleDownButton = form.querySelector('.scale__control--smaller');
  const scaleInput = form.querySelector('.scale__control--value');

  scaleUpButton.addEventListener('click', onScaleUpButtonClick.bind(null, scaleInput, image));
  scaleDownButton.addEventListener('click', onScaleDownButtonClick.bind(null, scaleInput, image));

  return {
    reset: () => image.style.removeProperty('transform'),
  };
};

export { createFormScaling };
