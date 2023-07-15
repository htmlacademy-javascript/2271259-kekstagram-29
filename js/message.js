
const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  messageElement
    .querySelector(closeButtonClass)
    .addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage};
// const onDocumentKeydown = (evt) => isEscapeKey(removeMessage, evt);

// const onBodyClick = removeMessage;

// const onCloseMessageButtonClick = removeMessage;

// const onMessageInnerClick = (evt) => evt.stopPropagation();

// const findMessage = () => document.querySelectorAll('.error, .success');

// function removeMessage() {
//   const foundMessage = findMessage().item(0);
//   foundMessage.remove();

//   document.removeEventListener('keydown', onDocumentKeydown, true);
//   document.body.removeEventListener('click', onBodyClick);
// }

// const createMessage = (template, buttonSelector, innerSelector) => {
//   const message = template.cloneNode(true);
//   const messageInner = message.querySelector(innerSelector);
//   const closeMessageButton = message.querySelector(buttonSelector);

//   document.addEventListener('keydown', onDocumentKeydown, true);
//   document.body.addEventListener('click', onBodyClick);
//   messageInner.addEventListener('click', onMessageInnerClick);
//   closeMessageButton.addEventListener('click', onCloseMessageButtonClick);

//   document.body.append(message);
// };

// const showSuccessMessage = () => createMessage(successMessage, '.success__button', '.success__inner');
// const showErrorMessage = () => createMessage(errorMessage, '.error__button', '.error__inner');

// export { showSuccessMessage, showErrorMessage };
