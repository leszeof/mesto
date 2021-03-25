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
import UserInfo from './UserInfo.js';
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
  updateProfile //! данные из инпутов обрабатывает колбэк, а нужно _getInputValues
);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo(profileSelectors);


  // add new place popup controller copy
const addNewPlacePopup = new PopupWithForm(
  '.popup_type_add-place',
  addNewPlace //! данные из инпутов обрабатывает колбэк, а нужно _getInputValues
);
addNewPlacePopup.setEventListeners();


//! вот это вроде работает по канонам
  // image preview popup controller copy
const imagePreviewPopup = new PopupWithImage(
  '.popup_type_image-preview',
  handleCardClick
);
imagePreviewPopup.setEventListeners();





// Functions
  // open any popup, universal function
function openPopup(popup) {
  popup.classList.add('popup_opened');

  //! выкинуть
  // close popup on escape listener
  // document.addEventListener('keydown', closePopupOnEscPress);
}

  // close any popup, universal function
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //! выкинуть
  // delete close popup on escape listener
  // document.removeEventListener('keydown', closePopupOnEscPress);
}

  // close any popup on overlay click
  //! выкинуть
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




//! функции колбэки под классы

function updateProfile() {
  //! по хорошему тут будет связь с UserInfo классом, а не с вот этой фигней

  currentUserName.textContent = editProfileUserNameInput.value;
  currentUserJob.textContent = editProfileUserJobInput.value;
}

// supporting function for PopupWithImage class
function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}
//!







//!выкинуть
  // update user profile
function editProfile(event) {
  //! сюда надо передать результат работы this._getInputValues() и как то его размузолить
  event.preventDefault();

  const newUserName = editProfileUserNameInput.value;
  const newUserJob = editProfileUserJobInput.value;

  currentUserName.textContent = newUserName;
  currentUserJob.textContent = newUserJob;
}

// add new place popup functions
  // add new card function
function addNewPlace(formData) {
  console.log(formData); //! сюда надо передать результат работы this._getInputValues() и как то его размузолить
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
//! выкинуть
function fillImagePreviewPopup(name, link) {
  imagePreviewPopup.open(name, link);
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

  //! выкинуть
// editProfilePopupWindow.addEventListener('click', closePopupOnOverlayClick);

//! выкинуть
  // submit edit profile form
editProfileForm.addEventListener('submit', (event) => {
  // editProfile(event);
  // editProfilePopup.close();
})





// Event listeners for add place popup
  // open add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  newPlacePopupFormValidator.disableSubmitButton(newPlacePopupForm);
  addNewPlacePopup.open();
});

//! выкинуть
  // close add place popup
// newPlacePopupCloseButton.addEventListener('click', () => {
//   closePopup(newCardPopupWindow);
// });

  // close add place popup on overlay click
  //! выкинуть
// newCardPopupWindow.addEventListener('click', closePopupOnOverlayClick);

//! выкинуть
// newPlacePopupForm.addEventListener('submit', (event) => {
//   addNewPlace(event);
//   newPlacePopupForm.reset();
//   closePopup(newCardPopupWindow);
// });

  // Event listeners for image preview popup
  // close image preview popup
  //! выкинуть
// imagePreviewCloseButton.addEventListener('click', () => {
//   closePopup(imagePreviewPopupWindow);
// });
  // close image preview popup on overlay click

  //! выкинуть
// imagePreviewPopupWindow.addEventListener('click', closePopupOnOverlayClick);








// Validation
  // edit user profile form validator
const editProfileFormValidator = new FormValidator(validationSettings , editProfileForm);
editProfileFormValidator.enableValidation();

  // add new place form validator
const newPlacePopupFormValidator = new FormValidator(validationSettings , newPlacePopupForm);
newPlacePopupFormValidator.enableValidation();
