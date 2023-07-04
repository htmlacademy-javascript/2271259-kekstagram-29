const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPhotos = ({ url, description, likes, comments}) => {

  const pictureElement = pictureTemplate.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

// const renderPictures = (pictures) => {
//   picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
//   picturesContainer.append(...pictures.map(createPhotos)):
// };

const displayPhotos = (photos) => picturesContainer.append(...photos.map(createPhotos));

export {displayPhotos};
