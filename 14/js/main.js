import { createSimilarPerson } from './data.js';
import { renderGallery } from './gallery.js';
import { initiateForm } from './form.js';

const photos = createSimilarPerson();

renderGallery(photos);
initiateForm();
