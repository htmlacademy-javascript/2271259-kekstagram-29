const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagLimit = 5;
const commentLimit = 140;

const onElementKeydown = (evt) => evt.stopPropagation();

const pristineValidator = (form) => new Pristine(
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

const validHashtag = (hashtag) => hashtagPattern.test(hashtag);

const validateHashtagCount = (hashtagString) =>
  normalizeHashtags(hashtagString).length <= hashtagLimit;

const validateHashtagUniqueness = (hashtagString) => {
  const normalizedHashtags = normalizeHashtags(hashtagString);
  return normalizedHashtags.length === new Set(normalizedHashtags).size;
};

const validateHashtagPattern = (hashtagString) =>
  !hashtagString || normalizeHashtags(hashtagString).every(validHashtag);

const validateTextarea = ({ length }) => length <= commentLimit;

const hashtagCountErrorMessage = () => 'Нельзя указать больше пяти хэш-тегов !';
const hashtagUniqErrorMessage = () => 'Один и тот же хэш-тег не может быть использован дважды !';
const hashtagPatternErrorMessage = () => 'Введён невалидный хэш-тег !';
const textareaErrorMessage = () => 'Длина комментария не может составлять больше 140 символов !';

const stopKeydownEventPropagation = (...elements) => elements.forEach((element) =>
  element.addEventListener('keydown', onElementKeydown));

const createFormValidation = (form) => {
  const hashtagsInput = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = pristineValidator(form);

  pristine.addValidator(hashtagsInput, validateHashtagCount, hashtagCountErrorMessage, 3, true);
  pristine.addValidator(hashtagsInput, validateHashtagUniqueness, hashtagUniqErrorMessage, 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagPattern, hashtagPatternErrorMessage, 1);
  pristine.addValidator(textarea, validateTextarea, textareaErrorMessage);

  stopKeydownEventPropagation(hashtagsInput, textarea);

  return {
    validate: () => pristine.validate([textarea, hashtagsInput]),
    reset: pristine.reset,
  };
};

export { createFormValidation };
