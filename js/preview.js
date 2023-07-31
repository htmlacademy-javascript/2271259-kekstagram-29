const fileTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
];

const createFormPreview = (form, image) => {
  const effectsPreviews = form.querySelectorAll('.effects__preview');

  return {
    validate: (file) => fileTypes.includes(file.type),
    refresh: (file) => {
      const imagePath = URL.createObjectURL(file);

      image.src = imagePath;
      effectsPreviews.forEach((effectsPreview) =>
        effectsPreview.style.setProperty('background-image', `url(${imagePath})`));
    },
    reset: () => {
      effectsPreviews.forEach((effectsPreview) =>
        effectsPreview.style.removeProperty('background-image'));
    },
  };
};

export { createFormPreview };
