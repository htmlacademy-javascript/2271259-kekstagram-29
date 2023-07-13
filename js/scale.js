const maxScale = 100;
const minScale = 25;
const scaleStep = 25;

const zoomOutButton = document.querySelector(".scale__control--smaller");
const zoomInButton = document.querySelector(".scale__control--bigger");
const scaleFieldValue = document.querySelector(".scale__control--value");
const scalePreview = document.querySelector(".img-upload__preview img");

const scaleImage = value => {
  scalePreview.style.transform = `scale(${value / 100})`;
  scaleFieldValue.value = `${value}%`;
};

const resetScale = () => scaleImage(maxScale);

const zoom = step => {
  const scaleFieldValueNumber = parseInt(scaleFieldValue.value, 10) + step;
  if (scaleFieldValueNumber <= maxScale && scaleFieldValueNumber >= minScale) {
    scaleImage(scaleFieldValueNumber);
  }
};

const onZoomInButtonClick = () => zoom(scaleStep);
const onZoomOutButtonClick = () => zoom(-scaleStep);

const init = () => {
  resetScale();
  zoomInButton.addEventListener("click", onZoomInButtonClick);
  zoomOutButton.addEventListener("click", onZoomOutButtonClick);
};

export { init, resetScale };
