import { formValidation } from './validate.js';
import { createFormSlider } from './slider.js';
import {createFormScaling} from './scale.js';
import { createFormPreview } from './preview.js';

const form = document.querySelector('#upload-select-image');
const inputUploadFile = form.querySelector('#upload-file');
const formModal = form.querySelector('.img-upload__overlay');
const buttonToCloseModal = form.querySelector('.img-upload__cancel');
const image = form.querySelector('.img-upload__preview img');

const makeformValidation = formValidation(form);
const formSlider = createFormSlider(form, image);
const formScaling = createFormScaling(form, image);
const formPreview = createFormPreview(form, image);

// const onInputToUploadFile = openFormModal;

const onButtonToCloseModalClick = onCloseFormModal;

const onFormSubmit = (evt) => {
  const isValidForm = makeformValidation.validate();

  if (isValidForm) {
    form.submit();
  }

  evt.preventDefault();
};

const onUploadFileInputChange = (evt) => {
  const file = evt.target.files[0];

  if (formPreview.validate(file)) {
    formPreview.refresh(file);
    openFormModal();
  }
};

const formReset = () => {
  form.reset();
  makeformValidation.reset();
  formSlider.reset();
  formScaling.reset();
  formPreview.reset();
};

function onCloseFormModal() {
  document.body.classList.remove('modal-open');
  formModal.classList.add('hidden');

  formReset();

  document.removeEventListener('keydown', onCloseFormModal);
}

function openFormModal() {
  document.body.classList.add('modal-open');
  formModal.classList.remove('hidden');
  document.addEventListener('keydown', onCloseFormModal);
}

const initiateForm = () => {
  inputUploadFile.addEventListener('change', onUploadFileInputChange);
  buttonToCloseModal.addEventListener('click', onButtonToCloseModalClick);
  form.addEventListener('submit', onFormSubmit);
};

export { initiateForm, onCloseFormModal };
