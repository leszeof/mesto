// Imports
  // data
import initialCards from './data/cards-data.js';
  // classes
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
  // constants
import {
  validationSettings,
  editProfilePopupWindow,
  editProfileOpenButton,
  editProfileCloseButton,
  editProfileForm,
  editProfileUserNameInput,
  editProfileUserJobInput,
  currentUserName,
  currentUserJob,
  newCardPopupWindow,
  newPlacePopupOpenButton,
  newPlacePopupCloseButton,
  newPlacePopupForm,
  newPlaceInput,
  newPlaceImageLinkInput,
  imagePreviewPopupWindow,
  imagePreviewCloseButton,
  imagePreview,
  imageCaption,
  cardsContainer,
  popupSelectors,
  userProfileSelectors,
} from './constants.js';


// Popup classes in use
//   edit profile popup controller copy
const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  editProfileFunction
);
editProfilePopup.setEventListeners();

  // add new place popup controller copy
// const addNewPlacePopup = new PopupWithForm(popupSelectors.editProfilePopupSelector, popupSelectors, submitFormHandler);
// addNewPlacePopup.setEventListeners();

  // image preview popup controller copy
const imagePreviewPopup = new PopupWithImage(popupSelectors.imagePreviewPopupSelector, popupSelectors);
imagePreviewPopup.setEventListeners();





// Functions
  // open any popup, universal function
function openPopup(popup) {
  popup.classList.add('popup_opened');

  // close popup on escape listener
  // document.addEventListener('keydown', closePopupOnEscPress);
}

  // close any popup, universal function
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  // delete close popup on escape listener
  // document.removeEventListener('keydown', closePopupOnEscPress);
}

  // close any popup on overlay click
// function closePopupOnOverlayClick(event) {
//   if (event.currentTarget == event.target) {
//     closePopup(event.currentTarget);
//   }
// }

//edit user profile popup functions
  // set input values when opening edit profile popup
function setInputValues() {
  editProfileUserNameInput.value = currentUserName.textContent;
  editProfileUserJobInput.value = currentUserJob.textContent;
}

//!


function editProfileFunction() {
  currentUserName.textContent = editProfileUserNameInput.value;
  currentUserJob.textContent = editProfileUserJobInput.value;
}

// supporting function for PopupWithImage class
function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}
//!

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
  const card = new Card(rawCardItem, '.cards-item', handleCardClick);
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









// Event listeners
  // Event listeners for user profile popup
  // open user profile popup
editProfileOpenButton.addEventListener('click', () => {
  setInputValues();
  editProfilePopup.open(); //!
});
  // close edit profile popup
editProfileCloseButton.addEventListener('click', () => {
  // closePopup(editProfilePopupWindow);
  editProfilePopup.close(); //!
});
  // close edit profile popup on overlay click
// editProfilePopupWindow.addEventListener('click', closePopupOnOverlayClick);
  // submit edit profile form
editProfileForm.addEventListener('submit', (event) => {
  editProfile(event);
  editProfilePopup.close();
})





// Event listeners for add place popup
  // open add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  newPlacePopupFormValidator.disableSubmitButton(newPlacePopupForm);
  openPopup(newCardPopupWindow);
});

  // close add place popup
// newPlacePopupCloseButton.addEventListener('click', () => {
//   closePopup(newCardPopupWindow);
// });

  // close add place popup on overlay click
// newCardPopupWindow.addEventListener('click', closePopupOnOverlayClick);
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
// imagePreviewPopupWindow.addEventListener('click', closePopupOnOverlayClick);








// Validation
  // edit user profile form validator
const editProfileFormValidator = new FormValidator(validationSettings , editProfileForm);
editProfileFormValidator.enableValidation();

  // add new place form validator
const newPlacePopupFormValidator = new FormValidator(validationSettings , newPlacePopupForm);
newPlacePopupFormValidator.enableValidation();







// тестовая попытка потыкать модальное окно, проверить работоспособность класса
// let a = new Popup('.popup_type_add-place', '.popup__close-button')
// console.log(a);
// a.open()
// a.setEventListeners();


// test 1
// let b = new PopupWithImage('.popup_type_image-preview', '.popup__close-button', '.popup__image', '.popup__image-caption');
// console.log(b);
// b.open();
// b.setEventListeners();

// test 2
// let c = new PopupWithForm('.popup_type_add-place', '.popup__close-button', '.popup__form', '.popup-form__input');
// console.log(c);
// c.open();
// c.setEventListeners();
