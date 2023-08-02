import { escapeKey } from './utils.js';


const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onDocumentKeydown = (evt) => escapeKey(removeMessage, evt);

const bodyClick = removeMessage;

const onCloseMessageButtonClick = removeMessage;

const onMessageInnerClick = (evt) => evt.stopPropagation();

const findMessage = () => document.querySelectorAll('.error, .success');
const foundMessage = findMessage().item(0);

function removeMessage() {
  foundMessage.remove();

  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.body.removeEventListener('click', bodyClick);
}

const createMessage = (template, buttonSelector, innerSelector) => {
  const message = template.cloneNode(true);
  const messageInner = message.querySelector(innerSelector);
  const closeMessageButton = message.querySelector(buttonSelector);

  document.addEventListener('keydown', onDocumentKeydown, true);
  document.body.addEventListener('click', bodyClick);
  messageInner.addEventListener('click', onMessageInnerClick);
  closeMessageButton.addEventListener('click', onCloseMessageButtonClick);

  document.body.append(message);
};

const showSuccessMessage = () => createMessage(successMessageTemplate, '.success__button', '.success__inner');
const showErrorMessage = () => createMessage(errorMessageTemplate, '.error__button', '.error__inner');

export { showSuccessMessage, showErrorMessage };
