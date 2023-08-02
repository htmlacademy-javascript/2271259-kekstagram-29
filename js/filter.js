import { debounce, getUniqueArray} from './utils.js';

const DELAY = 500;
const PHOTOS_COUNT = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersBtn = document.querySelectorAll('.img-filters__button');

const filters = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => {
    const getUniqueArrayElement = getUniqueArray(photos);
    return Array.from({ length: PHOTOS_COUNT }, getUniqueArrayElement);
  },
  'filter-discussed': (photos) =>
    photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length),
};

const filterPhotos = filters[filters.id];

function onFilterBtnClick(photos, optimizedRenderThumbnails, filtersState) {

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
  const optimizedRenderThumbnails = debounce(renderThumbnails, DELAY);
  const filtersState = {
    activeFilter: document.querySelector('.img-filters__button--active'),
  };

  filtersContainer.classList.remove('img-filters--inactive');

  filtersBtn.forEach((filterButton) =>
    filterButton.addEventListener('click', onFilterBtnClick.bind(
      filterButton,
      photos,
      optimizedRenderThumbnails,
      filtersState
    )));
};

export { initiateFilters };
