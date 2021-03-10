// Imports
import initialCards from './data/cards-data.js';
import Card from './Card.js';

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
  const curentOpenedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape' && curentOpenedPopup) {
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

//! удалить
// like card function
// function setLikeButton(event) {
//   event.target.classList.toggle('cards-item__like-button_active');
// }

//! удалить
// delete card function
// function deleteCard(event) {
//   event.target.closest('.cards__item').remove();
// }

// TODO по хорошему надо генерировать экземпляр класса
// add new place popup functions
  // add new card function
function addNewPlace(event) {
  event.preventDefault();

  const newCardData = {
    name: newPlaceInput.value,
    link: newPlaceImageLinkInput.value,
  }

  const newCardElement = new Card(newCardData, '.cards-item').generateCard();

  cardsContainer.prepend(newCardElement);
}








//TODO возможно понадобится делать импорт тут



//! поменять внутри, добавить вызов класса
// card add functionality (on start and in progress)
  // renders cards on start
function renderInitialCards(rawArrayOfCards) {

  const renderedCards = rawArrayOfCards.map( (rawCardItem) => {
    const cardElementObj = new Card (rawCardItem, '.cards-item');
    //! console.log(cardElementObj);

    const newCardElement = cardElementObj.generateCard();
    //! console.log(newCardElement);

    return newCardElement;
  })

  cardsContainer.prepend(...renderedCards);
}
renderInitialCards(initialCards);

//! больше не нужно
  // generate a card at any moment
// function generateNewCard(name, link) {
//   const cardItemTemplate = document.querySelector('.template-card-item').content;
//   const cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);

//   const cardImage = cardElement.querySelector('.cards-item__image')
//   cardImage.src = link;
//   cardImage.alt = name;
//   cardElement.querySelector('.cards-item__title').textContent = name;

//   // event-listeners
//   // fill and open image preview popup
//   cardElement.querySelector('.cards-item__image').addEventListener('click', (event) => {
//     fillImagePreviewPopup(event);
//     openPopup(imagePreviewPopupWindow);
//   });
//   // like card listener
//   cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton);
//   // delete card listener
//   cardElement.querySelector('.cards-item__delete-button').addEventListener('click', deleteCard);

//   return cardElement;
// }

// image preview popup functions
  // insert new content in preview image popup
function fillImagePreviewPopup(event) {
  const image = event.target.src;
  const title = event.target.alt;

  imagePreview.src = image;
  imagePreview.alt = title;
  imageCaption.textContent = title;
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
  disableSubmitButton(newPlacePopupForm);
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





//! это должно быть в теле renderInitialCards
// initialCards.forEach(rawCardItem => {
//   const cardElement = new Card(rawCardItem, '.cards-item');
//   // console.log(cardElement);

//   const newCard = cardElement.generateCard();

//   // console.log(newCard);

//   cardsContainer.append(newCard);
// })


// Enable validation on forms
  // add new place form validator
const newPlacePopupFormValidator = new FormValidator(validationSettings , newPlacePopupForm);
newPlacePopupFormValidator.enableValidation();

  // edit user profile form validator
const editProfileFormValidator = new FormValidator(validationSettings , editProfileForm);
editProfileFormValidator.enableValidation();
