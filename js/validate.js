const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagLimit = 5;
const commentLimit = 140;

const onElementKeydown = (evt) => evt.stopPropagation();

const createPristineValidator = (form) => new Pristine(
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

const normalizeHashtags = (hashtagString) => hashtagString.trim().toLowerCase().split(/\s+/);

const isValidHashtag = (hashtag) => hashtagPattern.test(hashtag);

const validateHashtagCount = (hashtagString) =>
  normalizeHashtags(hashtagString).length <= hashtagLimit;

const validateHashtagUniqueness = (hashtagString) => {
  const normalizedHashtags = normalizeHashtags(hashtagString);
  return normalizedHashtags.length === new Set(normalizedHashtags).size;
};

const validateHashtagPattern = (hashtagString) =>
  !hashtagString || normalizeHashtags(hashtagString).every(isValidHashtag);

const validateTextarea = ({ length }) => length <= commentLimit;

const getHashtagCountErrorMessage = () => 'Нельзя указать больше пяти хэш-тегов !';
const getHashtagUniqErrorMessage = () => 'Один и тот же хэш-тег не может быть использован дважды !';
const getHashtagPatternErrorMessage = () => 'Введён невалидный хэш-тег !';
const getTextareaErrorMessage = () => 'Длина комментария не может составлять больше 140 символов !';

const stopKeydownEventPropagation = (...elements) => elements.forEach((element) =>
  element.addEventListener('keydown', onElementKeydown));

const createFormValidation = (form) => {
  const hashtagsInput = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = createPristineValidator(form);

  pristine.addValidator(hashtagsInput, validateHashtagCount, getHashtagCountErrorMessage, 3, true);
  pristine.addValidator(hashtagsInput, validateHashtagUniqueness, getHashtagUniqErrorMessage, 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagPattern, getHashtagPatternErrorMessage, 1);
  pristine.addValidator(textarea, validateTextarea, getTextareaErrorMessage);

  stopKeydownEventPropagation(hashtagsInput, textarea);

  return {
    validate: () => pristine.validate([textarea, hashtagsInput]),
    reset: pristine.reset,
  };
};

export { createFormValidation };
