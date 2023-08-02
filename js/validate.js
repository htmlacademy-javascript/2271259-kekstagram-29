const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LIMIT = 5;
const COMMENT_LIMIT = 140;

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

const getValidHashtag = (hashtag) => HASHTAG_PATTERN.test(hashtag);

const validateHashtagCount = (hashtagString) =>
  normalizeHashtags(hashtagString).length <= HASHTAG_LIMIT;

const validateHashtagUniqueness = (hashtagString) => {
  const normalizedHashtags = normalizeHashtags(hashtagString);
  return normalizedHashtags.length === new Set(normalizedHashtags).size;
};

const validateHashtagPattern = (hashtagString) =>
  !hashtagString || normalizeHashtags(hashtagString).every(getValidHashtag);

const validateTextarea = ({ length }) => length <= COMMENT_LIMIT;

const showHashtagCountErrorMessage = () => 'Нельзя указать больше пяти хэш-тегов !';
const showHashtagUniqErrorMessage = () => 'Один и тот же хэш-тег не может быть использован дважды !';
const showHashtagPatternErrorMessage = () => 'Введён невалидный хэш-тег !';
const showTextareaErrorMessage = () => 'Длина комментария не может составлять больше 140 символов !';

const stopKeydownEventPropagation = (...elements) => elements.forEach((element) =>
  element.addEventListener('keydown', onElementKeydown));

const createFormValidation = (form) => {
  const hashtagsInput = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = createPristineValidator(form);

  pristine.addValidator(hashtagsInput, validateHashtagCount, showHashtagCountErrorMessage, 3, true);
  pristine.addValidator(hashtagsInput, validateHashtagUniqueness, showHashtagUniqErrorMessage, 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagPattern, showHashtagPatternErrorMessage, 1);
  pristine.addValidator(textarea, validateTextarea, showTextareaErrorMessage);

  stopKeydownEventPropagation(hashtagsInput, textarea);

  return {
    validate: () => pristine.validate([textarea, hashtagsInput]),
    reset: pristine.reset,
  };
};

export { createFormValidation };
