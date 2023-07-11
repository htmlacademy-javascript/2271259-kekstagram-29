import { formValidation } from './validate.js';


const form = document.querySelector('#upload-select-image');
const inputUploadFile = form.querySelector('#upload-file');
const formModal = form.querySelector('.img-upload__overlay');
const buttonToCloseModal = form.querySelector('.img-upload__cancel');

const makeformValidation = formValidation(form);

const onInputToUploadFile = () => {
  openFormModal();
};

const onButtonToCloseModalClick = () => closeFormModal();

const onFormSubmit = (evt) => {
  const isValidForm = makeformValidation.validate();

  if (isValidForm) {
    form.submit();
  }

  evt.preventDefault();
};

const formReset = () => {
  form.reset();
  makeformValidation.reset();

};

function closeFormModal() {
  document.body.classList.remove('modal-open');
  formModal.classList.add('hidden');

  formReset();

  document.removeEventListener('keydown', closeFormModal);
}

function openFormModal() {
  document.body.classList.add('modal-open');
  formModal.classList.remove('hidden');
  document.addEventListener('keydown', closeFormModal);
}

const initiateForm = () => {
  inputUploadFile.addEventListener('change', onInputToUploadFile);
  buttonToCloseModal.addEventListener('click', onButtonToCloseModalClick);
  form.addEventListener('submit', onFormSubmit);
};

export { initiateForm };
