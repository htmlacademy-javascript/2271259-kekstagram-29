import { handleEscapeKey, show, hide, isHidden } from './utils.js';

const COMMENTS_PER_LOAD = 5;

const photoModal = document.querySelector('.big-picture');
const photo = photoModal.querySelector('.big-picture__img img');
const likesCounter = photoModal.querySelector('.likes-count');
const currentCommentCounter = photoModal.querySelector('.social__comment-count').firstChild;
const overallCommentCounter = photoModal.querySelector('.comments-count');
const photoCaption = photoModal.querySelector('.social__caption');
const commentList = photoModal.querySelector('.social__comments');
const closeModalButton = photoModal.querySelector('#picture-cancel');
const loadCommentsButton = photoModal.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const onDocumentKeydown = (evt) => handleEscapeKey(closePhotoModal, evt);

const onCloseModalButtonClick = () => closePhotoModal();

const onLoadCommentsButtonClick = () => {
  const count = showComments();
  increaseCommentCounter(count);
};

const setCommentCounter = (initialCount) => {
  const initialCommentCount = initialCount >= COMMENTS_PER_LOAD
    ? COMMENTS_PER_LOAD
    : initialCount;
  currentCommentCounter.textContent = `${initialCommentCount} из `;
};

function increaseCommentCounter(count) {
  let currentCommentCount = parseInt(currentCommentCounter.textContent, 10);
  currentCommentCount += count;
  currentCommentCounter.textContent = `${currentCommentCount} из `;
}

const createComment = ({ avatar: avatarPath, message, name }) => {
  const comment = commentTemplate.cloneNode(true);

  const avatar = comment.querySelector('.social__picture');
  avatar.src = avatarPath;
  avatar.alt = name;

  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const appendComments = (commentData) => {
  commentList.innerHTML = '';
  commentList.append(...commentData.map((commentDatum, index) => {
    const comment = createComment(commentDatum);

    if (index >= COMMENTS_PER_LOAD) {
      hide(comment);
    }

    return comment;
  }));
};

function showComments() {
  const filteredComments = [...commentList.children].filter(isHidden);
  const { length } = filteredComments;

  if (length <= COMMENTS_PER_LOAD) {
    hide(loadCommentsButton);
  }

  let index = 0;
  while (index < length && index < COMMENTS_PER_LOAD) {
    show(filteredComments[index]);
    index += 1;
  }

  return index;
}

function closePhotoModal() {
  document.body.classList.remove('modal-open');
  show(loadCommentsButton);
  hide(photoModal);

  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPhotoModal = () => {
  document.body.classList.add('modal-open');
  show(photoModal);

  document.addEventListener('keydown', onDocumentKeydown);
};

const initiatePhotoModal = (url, description, likes, comments) => {
  const { length } = comments;

  photo.src = url;
  likesCounter.textContent = likes;
  overallCommentCounter.textContent = length;
  photoCaption.textContent = description;

  if (length <= COMMENTS_PER_LOAD) {
    hide(loadCommentsButton);
  }

  setCommentCounter(length);
  appendComments(comments);
};

const renderPhotoModal = (...photoParameters) => {
  initiatePhotoModal(...photoParameters);
  openPhotoModal();
};

closeModalButton.addEventListener('click', onCloseModalButtonClick);
loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);

export { renderPhotoModal };
