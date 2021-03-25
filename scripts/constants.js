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

export const popupSelectors = {
  // user profile popup //! Невозможно нормально использовать
  editProfilePopupSelector: '.popup_type_edit-profile',

  // add new place popup //! Невозможно нормально использовать
  newCardPopupSelector: '.popup_type_add-place',

  // image preview popup //! Невозможно нормально использовать
  imagePreviewPopupSelector: '.popup_type_image-preview',

  popupImageSelector: '.popup__image',
  popupImageTitleSelector: '.popup__image-caption',

  // global
  closeButtonSelector: '.popup__close-button',
  formSelector: '.popup__form',
  formInputSelector: '.popup-form__input',
  popupActiveClass: 'popup_opened',
};

export const userProfileSelectors = {
  userName: '.user-profile__name',
  userDescription: '.user-profile__description',
}
