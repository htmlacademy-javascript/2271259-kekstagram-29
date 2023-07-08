import { createSimilarPerson } from './data.js';

import { renderGallery } from './gallery.js';

const photos = createSimilarPerson();

renderGallery(photos);
