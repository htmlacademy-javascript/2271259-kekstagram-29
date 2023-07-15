const bigPicture = document.querySelector('.big-picture');
const modulePicture = bigPicture.querySelector('.big-picture__img img');
const closeModal = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const body = document.querySelector('body');

// const commentCount = bigPicture.querySelector('.social__comment-count');
// const totalCommentCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialAvatar = bigPicture.querySelector('.social__comments');
// const commentLoader = document.querySelector('.comments-loader');
// const commentAvatar = socialAvatar.querySelector('.social__picture');
// const socialText = socialAvatar.querySelector('.social__text');
const commentTemplate = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('social__picture').alt = name;
  comment.querySelector('social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  socialAvatar.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  socialAvatar.append(fragment);
};

const hideBigPhoto = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeOpenModal = () => {
  hideBigPhoto();

  // Delete hidbigphoto
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeOpenModal();
  }
}

const onCancelButtonClick = () => {
  closeOpenModal();
};

const renderPictureDetails = ({ url, likes, description }) => {
  modulePicture.src = url;
  modulePicture.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const openingModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const OpenUserModal = (data) => {
  // commentLoader.classList.add('hidden');
  // commentCount.classList.add('hidden');
  openingModal();
  // delete opening modal

  renderPictureDetails(data);
  renderComments(data.comments);
};

closeModal.addEventListener('click', onCancelButtonClick);

export { OpenUserModal };
