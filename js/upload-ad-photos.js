
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const loadImagesButton = document.querySelector('input[name="images"]');
const loadAvatarPreviewButton = document.querySelector('input[name="avatar"]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesContainerPreview = document.querySelector('.ad-form__photo');

const defaultAvatarPreview = avatarPreview.src;

function outputAdImage(imageFile) {
  const adFormPreviewImg = document.createElement('img');
  adFormPreviewImg.style.width = `${imagesContainerPreview.offsetWidth}px`;
  adFormPreviewImg.style.height = `${imagesContainerPreview.offsetHeight}px`;
  adFormPreviewImg.src = URL.createObjectURL(imageFile);
  imagesContainerPreview.appendChild(adFormPreviewImg);
}

function removeImagePreview() {

  avatarPreview.src = defaultAvatarPreview;
  if (imagesContainerPreview.children.length > 0) {
    imagesContainerPreview.removeChild(imagesContainerPreview.querySelector('img'));
  }
}

function onImagePreview(evt) {
  const fileChooser = evt.target;
  const imageFile = fileChooser.files[0];
  const imageFileName = imageFile.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => imageFileName.endsWith(item));

  if (matches) {
    switch (fileChooser.name) {
      case 'avatar':
        avatarPreview.src = URL.createObjectURL(imageFile);
        break;
      case 'images': outputAdImage(imageFile);
        break;
    }
  }
}

loadAvatarPreviewButton.addEventListener('change', onImagePreview);
loadImagesButton.addEventListener('change', onImagePreview);

export { removeImagePreview };
