import { getData } from './server.js';
import { showErrorBlock } from './utils.js';
import { renderThumbnails } from './photo-modal.js';
import { initiateForm } from './form.js';
import { initiateFilters } from './filter.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initiateFilters(photos, renderThumbnails);
  })
  .catch(({ message }) => showErrorBlock(message));

initiateForm();
