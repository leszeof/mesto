// Imports
import initialCards from './data/cards-data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import validationSettings from './constants.js'

// Exports
export {fillImagePreviewPopup, openPopup, imagePreviewPopupWindow};

// Variables
  // user profile popup
const editProfilePopupWindow = document.querySelector('.popup_type_edit-profile');
const editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
const editProfileCloseButton = editProfilePopupWindow.querySelector('.popup__close-button');
const editProfileForm = editProfilePopupWindow.querySelector('.popup__form');
const editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_type_name');
const editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_type_job');
const currentUserName = document.querySelector('.user-profile__name');
const currentUserJob = document.querySelector('.user-profile__description');

  // add new place popup
const newCardPopupWindow = document.querySelector('.popup_type_add-place');
const newPlacePopupOpenButton = document.querySelector('.user-profile__add-button');
const newPlacePopupCloseButton = newCardPopupWindow.querySelector('.popup__close-button');
const newPlacePopupForm = newCardPopupWindow.querySelector('.popup__form');
const newPlaceInput = newPlacePopupForm.querySelector('.popup-form__input_type_place');
const newPlaceImageLinkInput = newPlacePopupForm.querySelector('.popup-form__input_type_link');

  // image preview popup
const imagePreviewPopupWindow = document.querySelector('.popup_type_image-preview');
const imagePreviewCloseButton = imagePreviewPopupWindow.querySelector('.popup__close-button');
const imagePreview = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

  // initial cards
const cardsContainer = document.querySelector('.cards__list');

// Functions
  // open any popup, universal function
function openPopup(popup) {
  popup.classList.add('popup_opened');

  // close popup on escape listener
  document.addEventListener('keydown', closePopupOnEscPress);
}

  // close any popup, universal function
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  // delete close popup on escape listener
  document.removeEventListener('keydown', closePopupOnEscPress);
}

  // close any popup on 'escape' press
function closePopupOnEscPress(event) {
  if (event.key === 'Escape') {
    const curentOpenedPopup = document.querySelector('.popup_opened');
    closePopup(curentOpenedPopup);
  }
}

  // close any popup on overlay click
function closePopupOnOverlayClick(event) {
  if (event.currentTarget == event.target) {
    closePopup(event.currentTarget);
  }
}

//edit user profile popup functions
  // set input values when opening edit profile popup
function setInputValues() {
  editProfileUserNameInput.value = currentUserName.textContent;
  editProfileUserJobInput.value = currentUserJob.textContent;
}

  // update user profile
function editProfile(event) {
  event.preventDefault();

  const newUserName = editProfileUserNameInput.value;
  const newUserJob = editProfileUserJobInput.value;

  currentUserName.textContent = newUserName;
  currentUserJob.textContent = newUserJob;
}

// add new place popup functions
  // add new card function
function addNewPlace(event) {
  event.preventDefault();

  const newCardData = {
    name: newPlaceInput.value,
    link: newPlaceImageLinkInput.value,
  }
  const newCardElement = createCard(newCardData);

  cardsContainer.prepend(newCardElement);
}

// function calls Card class and return html card
function createCard(rawCardItem) {
  const card = new Card(rawCardItem, '.cards-item');
  return card.generateCard();
}

// card add functionality (on start and in progress)
  // renders cards on start
function renderInitialCards(rawArrayOfCards) {

  const renderedCards = rawArrayOfCards.map( (rawCardItem) => {
    const newCardElement = createCard(rawCardItem);

    return newCardElement;
  })

  cardsContainer.prepend(...renderedCards);
}
renderInitialCards(initialCards);

// image preview popup functions
  // insert new content in preview image popup
function fillImagePreviewPopup(name, link) {
  imagePreview.src = link;
  imagePreview.alt = name;
  imageCaption.textContent = name;
}

// disables submit button for add place popup when popup is reused
function disableSubmitButton(formElement) {
  const submitButton = formElement.querySelector('.popup-form__submit-button');
  submitButton.disabled = true;
}

// Event listeners
  // Event listeners for user profile popup
  // open user profile popup
editProfileOpenButton.addEventListener('click', () => {
  setInputValues();
  openPopup(editProfilePopupWindow);
});
  // close edit profile popup
editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopupWindow);
});
  // close edit profile popup on overlay click
editProfilePopupWindow.addEventListener('click', closePopupOnOverlayClick);
  // submit edit profile form
editProfileForm.addEventListener('submit', (event) => {
  editProfile(event);
  closePopup(editProfilePopupWindow);
})

// Event listeners for add place popup
  // open add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  newPlacePopupFormValidator.disableSubmitButton(newPlacePopupForm);
  openPopup(newCardPopupWindow);
});
  // close add place popup
newPlacePopupCloseButton.addEventListener('click', () => {
  closePopup(newCardPopupWindow);
});
  // close add place popup on overlay click
newCardPopupWindow.addEventListener('click', closePopupOnOverlayClick);
newPlacePopupForm.addEventListener('submit', (event) => {
  addNewPlace(event);
  newPlacePopupForm.reset();
  closePopup(newCardPopupWindow);
});

  // Event listeners for image preview popup
  // close image preview popup
imagePreviewCloseButton.addEventListener('click', () => {
  closePopup(imagePreviewPopupWindow);
});
  // close image preview popup on overlay click
imagePreviewPopupWindow.addEventListener('click', closePopupOnOverlayClick);


// Validation
  // edit user profile form validator
const editProfileFormValidator = new FormValidator(validationSettings , editProfileForm);
editProfileFormValidator.enableValidation();

  // add new place form validator
const newPlacePopupFormValidator = new FormValidator(validationSettings , newPlacePopupForm);
newPlacePopupFormValidator.enableValidation();
