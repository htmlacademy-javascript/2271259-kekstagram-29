import { renderGallery } from './gallery.js';
import { initiateForm, onCloseFormModal } from './form.js';
import { getData, sendData } from './server.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { showAlert, debounce } from './utile.js';
import { init as initFilter ,getFilteredPictures} from './filter.js';
import { init } from './scale.js';

init();
initiateForm(async (data) => {
  try {
    await sendData(data);
    onCloseFormModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch(err) {
  showAlert(err.message);
}
