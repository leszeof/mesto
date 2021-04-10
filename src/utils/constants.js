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
export const editProfileForm = editProfilePopupWindow.querySelector('.popup__form');
export const editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_type_name');
export const editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_type_job');

  // add new place popup
export const newCardPopupWindow = document.querySelector('.popup_type_add-place');
export const newPlacePopupOpenButton = document.querySelector('.user-profile__add-button');
// export const newPlacePopupCloseButton = newCardPopupWindow.querySelector('.popup__close-button');
export const newPlacePopupForm = newCardPopupWindow.querySelector('.popup__form');

  // edit profile popup
export const userAvatarElem = document.querySelector('.user-profile__avatar');
export const editUserAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export const editUserAvatarPopupForm = editUserAvatarPopup.querySelector('.popup__form');

// user profile selectors
export const userProfileSelectors = {
  userNameSelector: '.user-profile__name',
  userDescriptionSelector: '.user-profile__description',
  avatarSelector: '.user-profile__avatar'
}

export const apiBasicSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '098e56f1-8498-493a-8138-2fc5a6b46ab9',
    'Content-Type': 'application/json'
  }
}
