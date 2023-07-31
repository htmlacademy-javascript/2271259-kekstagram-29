import { renderPhotoModal } from './photos.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailClick = (...parameters) => {
  const [url, description, likes, comments, evt] = parameters;
  evt.preventDefault();

  renderPhotoModal(url, description, likes, comments);
};

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', thumbnailClick.bind(
    thumbnail,
    url,
    description,
    likes,
    comments
  ));

  return thumbnail;
};

const renderThumbnails = (photos) => {
  picturesContainer.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  picturesContainer.append(...photos.map(createThumbnail));
};

export { renderThumbnails };
