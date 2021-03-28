// initial card data
export const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
];

// validation
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit-button',
  inputWithErrorClass: 'popup-form__input_type_error',
  activeSpanErrorClass: 'popup__input-error_active'
};

  // user profile popup
export const editProfilePopupWindow = document.querySelector('.popup_type_edit-profile');
export const editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
export const editProfileCloseButton = editProfilePopupWindow.querySelector('.popup__close-button');
export const editProfileForm = editProfilePopupWindow.querySelector('.popup__form');
export const editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_type_name');
export const editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_type_job');
export const currentUserName = document.querySelector('.user-profile__name');
export const currentUserJob = document.querySelector('.user-profile__description');

  // add new place popup
export const newCardPopupWindow = document.querySelector('.popup_type_add-place');
export const newPlacePopupOpenButton = document.querySelector('.user-profile__add-button');
export const newPlacePopupCloseButton = newCardPopupWindow.querySelector('.popup__close-button');
export const newPlacePopupForm = newCardPopupWindow.querySelector('.popup__form');
export const newPlaceInput = newPlacePopupForm.querySelector('.popup-form__input_type_place');
export const newPlaceImageLinkInput = newPlacePopupForm.querySelector('.popup-form__input_type_link');

  // image preview popup
export const imagePreviewPopupWindow = document.querySelector('.popup_type_image-preview');
export const imagePreviewCloseButton = imagePreviewPopupWindow.querySelector('.popup__close-button');
export const imagePreview = document.querySelector('.popup__image');
export const imageCaption = document.querySelector('.popup__image-caption');

  // initial cards
export const cardsContainer = document.querySelector('.cards__list');

export const userProfileSelectors = {
  userNameSelector: '.user-profile__name',
  userDescriptionSelector: '.user-profile__description',
}
