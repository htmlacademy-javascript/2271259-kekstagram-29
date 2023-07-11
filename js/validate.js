const hashtagsSymbols = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagsMin = 5;
const hashtagsMax = 140;
const hastagMaxError = () => 'Слишком много хэштегов !';
const hashtagUniquenessError = () => 'Два одинаковых хэштэга!';
const hashtagSymbolsError = () => 'Невалидный хэштег !';
const textError = () => 'Комментарий больше 140 символов !';

const formValidation = (form) => {
  const inputHashtags = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  }, true);

  const validateHashtag = (value) => value.split(' ').length <= hashtagsMin;
  const validateTextarea = (value) => value.length <= hashtagsMax;

  const validateHashtagSymbols = (value) => {
    const hashtags = value.split(' ');
    return !value.length || hashtags.every((hashtag) => hashtagsSymbols.test(hashtag));
  };

  const validateUniqueness = (value) => {
    const hashtags = value
      .split(' ')
      .map((hashtag) => hashtag.toLowerCase());

    return hashtags.length === new Set(hashtags).size;
  };

  pristine.addValidator(inputHashtags, validateHashtag, hastagMaxError);
  pristine.addValidator(inputHashtags, validateUniqueness, hashtagUniquenessError);
  pristine.addValidator(inputHashtags, validateHashtagSymbols , hashtagSymbolsError);
  pristine.addValidator(textarea, validateTextarea, textError);

  const hashtagsKeydown = (evt) => evt.stopPropagation();
  const yextareaKeydown = (evt) => evt.stopPropagation();

  inputHashtags.addEventListener('keydown', hashtagsKeydown);
  textarea.addEventListener('keydown', yextareaKeydown);

  return {
    validate: () => pristine.validate(inputHashtags, textarea),
    reset: pristine.reset,
  };
};

export {formValidation};
