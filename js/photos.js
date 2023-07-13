const pictureTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const createPhotos = ({ url, description, likes, comments, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(".picture__img").src = url;
  pictureElement.querySelector(".picture__img").alt = description;
  pictureElement.querySelector(".picture__comments").textContent =
    comments.length;
  pictureElement.querySelector(".picture__likes").textContent = likes;
  pictureElement.dataset.thumbnailId = id;

  return pictureElement;
};

const renderPictures = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createPhotos(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderPictures };
