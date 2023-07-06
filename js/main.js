import { createSimilarPerson } from './data.js';
import { displayPhotos } from './photos.js';
import { openingModule } from './big-module.js';

const photos = createSimilarPerson();
displayPhotos(photos);
openingModule();
