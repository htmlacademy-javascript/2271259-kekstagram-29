import { debounce, setRandomUniqueArrayPicker } from './utils.js';

const delay = 500;
const photosCount = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersBtn = document.querySelectorAll('.img-filters__button');

const filters = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => {
    const getRandomUniqueArrayElement = setRandomUniqueArrayPicker(photos);
    return Array.from({ length: photosCount }, getRandomUniqueArrayElement);
  },
  'filter-discussed': (photos) =>
    photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length),
};

function onFilterButtonClick(photos, optimizedRenderThumbnails, filtersState) {
  const filterPhotos = filters[this.id];

  if (filterPhotos && filtersState.activeFilter !== this) {
    const filteredPhotos = filterPhotos(photos);
    optimizedRenderThumbnails(filteredPhotos);

    renderButton(this, filtersState);
    filtersState.activeFilter = this;
  }
}

function renderButton(clickedButton, filtersState) {
  filtersState.activeFilter.classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
}

const initiateFilters = (photos, renderThumbnails) => {
  const optimizedRenderThumbnails = debounce(renderThumbnails, delay);
  const filtersState = {
    activeFilter: document.querySelector('.img-filters__button--active'),
  };

  filtersContainer.classList.remove('img-filters--inactive');

  filtersBtn.forEach((filterButton) =>
    filterButton.addEventListener('click', onFilterButtonClick.bind(
      filterButton,
      photos,
      optimizedRenderThumbnails,
      filtersState
    )));
};

export { initiateFilters };
