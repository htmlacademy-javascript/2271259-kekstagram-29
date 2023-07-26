const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleFieldValue = document.querySelector('.scale__control--value');
const scalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scalePreview.style.transform = `scale(${value / 100})`;
  scaleFieldValue.value = `${value}%`;
};

const resetScale = () => scaleImage(MAX_SCALE);

const zoom = (step) => {
  const scaleFieldValueNumber = parseInt(scaleFieldValue.value, 10) + step;
  if (scaleFieldValueNumber <= MAX_SCALE && scaleFieldValueNumber >= MIN_SCALE) {
    scaleImage(scaleFieldValueNumber);
  }
};

const onZoomInButtonClick = () => zoom(SCALE_STEP);
const onZoomOutButtonClick = () => zoom(-SCALE_STEP);

const createFormScaling = () => {
  resetScale();
  zoomInButton.addEventListener('click', onZoomInButtonClick);
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
};

export { createFormScaling };
