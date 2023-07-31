
import { escapeKey, show, hide } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { createFormValidation } from './validate.js';
import { createFormScaling } from './scale.js';
import { createFormSlider } from './slider.js';
import { sendData } from './server.js';
import { createFormPreview } from './preview.js';

const FIELDS = ['hashtags', 'description'];

const form = document.querySelector('#upload-select-image');
const image = form.querySelector('.img-upload__preview img');
const uploadFileInput = form.querySelector('#upload-file');
const formModal = form.querySelector('.img-upload__overlay');
const closeModalButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Опубликовываю...',
};

const formValidation = createFormValidation(form);
const formScaling = createFormScaling(form, image);
const formSlider = createFormSlider(form, image);
const formPreview = createFormPreview(form, image);

const onDocumentKeydown = (evt) => escapeKey(closeFormModal, evt);

const onUploadFileInputChange = (evt) => {
  const file = evt.target.files[0];

  if (formPreview.validate(file)) {
    formPreview.refresh(file);
    openFormModal();
  }
};

const onCloseModalButtonClick = closeFormModal;

const formReset = () => {
  form.reset();
  formValidation.reset();
  formScaling.reset();
  formSlider.reset();
  formPreview.reset();
};

function closeFormModal() {
  document.body.classList.remove('modal-open');
  hide(formModal);

  formReset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function openFormModal() {
  document.body.classList.add('modal-open');
  show(formModal);

  document.addEventListener('keydown', onDocumentKeydown);
}

const sendFormData = (body) =>
  sendData(body)
    .then(() => {
      showSuccessMessage();
      closeFormModal();
    })
    .catch(showErrorMessage);

const createFormData = (targetForm) => {
  const data = new FormData(targetForm);

  FIELDS.forEach((field) => data.set(field, data.get(field).trim()));

  return data;
};

const switchSubmitButtonState = (state, text) => {
  submitButton.disabled = state;
  submitButton.textContent = text;
};

const formSubmit = async (evt) => {
  evt.preventDefault();
  const isValidForm = formValidation.validate();

  if (isValidForm) {
    switchSubmitButtonState(true, SubmitButtonText.SUBMITTING);

    const data = createFormData(evt.target);
    await sendFormData(data);

    switchSubmitButtonState(false, SubmitButtonText.IDLE);
  }
};

const initiateForm = () => {
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  closeModalButton.addEventListener('click', onCloseModalButtonClick);
  form.addEventListener('submit', formSubmit);
};

export { initiateForm };
