import { renderPictures } from './photos.js';
import { showBigPicture } from './big-module.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest ('[data-thumbnail-id]');
    if(!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

    showBigPicture(picture);

  });

  renderPictures(pictures, container);
};

export {renderGallery};
