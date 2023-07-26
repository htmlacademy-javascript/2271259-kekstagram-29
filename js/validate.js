const hashtagsSymbols = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_MIN = 5;
const HASHTAGS_MAX = 140;
const hashtagMaxError = () => 'Слишком много хэштегов !';
const hashtagUniquenessError = () => 'Два одинаковых хэштэга!';
const hashtagSymbolsError = () => 'Невалидный хэштег !';
const textError = () => 'Комментарий больше 140 символов !';

const validateHashtag = (value) => value.split(/\s+/).length <= HASHTAGS_MIN;
const validateTextarea = (value) => value.length <= HASHTAGS_MAX;

const CreatePristineValidator = (form) => new Pristine(
  form,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  },
  true);

const validateHashtagSymbols = (value) => {
  const hashtags = value.split(/\s+/);
  return !value.length || hashtags.every((hashtag) => hashtagsSymbols.test(hashtag));
};

const hashtagsKeydown = (evt) => evt.stopPropagation();
const textareaKeydown = (evt) => evt.stopPropagation();

const validateUniqueness = (value) => {
  const hashtags = value.toLowerCase()
    .split(/\s+/)
    .map((hashtag) => hashtag.toLowerCase());

  return hashtags.length === new Set(hashtags).size;
};

const formValidation = (form) => {
  const inputHashtags = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = CreatePristineValidator(form);

  pristine.addValidator(inputHashtags, validateHashtag, hashtagMaxError);
  pristine.addValidator(inputHashtags, validateUniqueness, hashtagUniquenessError);
  pristine.addValidator(inputHashtags, validateHashtagSymbols , hashtagSymbolsError);
  pristine.addValidator(textarea, validateTextarea, textError);

  inputHashtags.addEventListener('keydown', hashtagsKeydown);
  textarea.addEventListener('keydown', textareaKeydown);

  return {
    validate: () => pristine.validate(inputHashtags, textarea),
    reset: pristine.reset,
  };
};

export {formValidation};
