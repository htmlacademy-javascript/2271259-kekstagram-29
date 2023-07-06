import { isEscapeKey, getRandomArrayElement, getRandomPositiveInteger } from './utile.js';
import { names, messages } from './data.js';

const openingModule = () => {
  const bigPicture = document.querySelector('.big-picture');
  const picture = document.querySelector('.picture');
  const closeModal = bigPicture.querySelector('.big-picture__cancel');
  const body = document.querySelector('body');
  const commentCount = document.querySelector('.social__comment-count');
  const commentLoader = document.querySelector('.comments-loader');

  const socialAvatar = document.querySelector('.social__comment');
  const commentAvatar = socialAvatar.querySelector('.social__picture');
  const socialText = socialAvatar.querySelector('.social__text');

  const modulePicture = document.querySelector('.big-picture__img img');
  const likesCount = document.querySelector('.likes-count');
  const socialCaption = document.querySelector('.social__caption');

  const onPopupEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };


  const openUserModal = () => {
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscKeydown);
  };

  const closeUserModal = () => {
    bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  const generatingComments = () => {
    const image = document.querySelector('.picture__img');

    const imgSaved = image.src;

    modulePicture.src = imgSaved;

    likesCount.textContent = Math.floor(Math.random() * 100);
    socialCaption.textContent = 'My photo';
    commentAvatar.src = `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`;
    commentAvatar.alt = getRandomArrayElement(names);
    socialText.textContent = getRandomArrayElement(messages);
  };

  picture.addEventListener('click', () => {
    openUserModal();

    body.classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');

    generatingComments();
  });

  closeModal.addEventListener('click', () => {
    closeUserModal();
  });
};

export {openingModule};

