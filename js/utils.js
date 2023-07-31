const errotTime = 3000;

const errorBlockStyle = {
  zIndex: '10',
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  padding: '10px 5px',
  fontSize: '16px',
  textAlign: 'center',
  color: '#ffffff',
  backgroundColor: '#fb4c4c',
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const handleEscapeKey = (callback, evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    callback();
  }
};

const show = (element) => element.classList.remove('hidden');

const hide = (element) => element.classList.add('hidden');

const isHidden = (element) => element.classList.contains('hidden');

const showErrorBlock = (message) => {
  const errorBlock = document.createElement('div');

  Object.entries(errorBlockStyle).forEach(([key, value]) => {
    errorBlock.style[key] = value;
  });
  errorBlock.textContent = message;

  document.body.append(errorBlock);

  setTimeout(() => errorBlock.remove(), errotTime);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomIntegerInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const setRandomUniqueIndexPicker = (min, max) => {
  const values = new Set();

  return () => {
    let currentValue = getRandomIntegerInclusive(min, max);

    if (values.size >= (max - min + 1)) {
      return null;
    }

    while (values.has(currentValue)) {
      currentValue = getRandomIntegerInclusive(min, max);
    }

    values.add(currentValue);
    return currentValue;
  };
};

const setRandomUniqueArrayPicker = (elements) => {
  const getRandomUniqueIndex = setRandomUniqueIndexPicker(0, elements.length - 1);

  return () => elements[getRandomUniqueIndex()];
};

export {
  handleEscapeKey,
  show,
  hide,
  isHidden,
  showErrorBlock,
  debounce,
  setRandomUniqueArrayPicker,
};
