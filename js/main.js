import { renderGallery } from './gallery.js';
import { initiateForm, onCloseFormModal } from './form.js';
import { getData, sendData } from './server.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { showAlert } from './utile.js';

// getData()
//   .then(renderGallery)
//   .catch(({message}) => showErrorBlock(message));

// initiateForm();

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
  renderGallery(data);
} catch(err) {
  showAlert(err.message);
}
