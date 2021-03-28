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
  userProfileSelectors,
} from './constants.js';

// Classes in use
  // Popup classes
  // edit profile popup controller copy
const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  updateProfile
);
editProfilePopup.setEventListeners();

  // add new place popup controller copy
const addNewPlacePopup = new PopupWithForm(
  '.popup_type_add-place',
  submitNewCardHandler
);
addNewPlacePopup.setEventListeners();

  // image preview popup controller copy
const imagePreviewPopup = new PopupWithImage(
  '.popup_type_image-preview',
  handleCardClick
);
imagePreviewPopup.setEventListeners();

  // UserInfo class
const userInfo = new UserInfo(userProfileSelectors);

  // Section class
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const newCardElement = createCard(cardData, '.cards-item', handleCardClick);
      cardsSection.addItem(newCardElement);
    },
  },
  '.cards__list'
);

// Functions
  // set input values when opening edit profile popup
function setInputValues({currentUserName, currentUserDescription}) {
  editProfileUserNameInput.value = currentUserName;
  editProfileUserJobInput.value = currentUserDescription;
}

// callback function on submit edit user profile form
function updateProfile(formData) {
  const newInfo = {
    newName: formData['new-user-name'],
    newDescription: formData['new-user-description']
  };

  userInfo.setUserInfo(newInfo);
}

// callback function for imagePreviewPopup copy of PopupWithImage class
function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// add new card callback function on submit add new place form
function submitNewCardHandler(formData) {
  const newCardData = {
    name: formData['new-place-name'],
    link: formData['new-place-link']
  };
  const newCardElement = createCard(newCardData, '.cards-item', handleCardClick);
  cardsSection.addItem(newCardElement);
}

// callback function for cardsSection copy of Section class
function createCard(rawCardItem) {
  const card = new Card(rawCardItem, '.cards-item', handleCardClick);
  return card.generateCard();
}

// renders cards on start
cardsSection.renderItems();

// Event listeners
  // Event listeners for user profile popup
  // open user profile popup
editProfileOpenButton.addEventListener('click', () => {
  setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});
  // close edit profile popup
editProfileCloseButton.addEventListener('click', () => {
  editProfilePopup.close();
});

// Event listeners for add place popup
  // open add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  newPlacePopupFormValidator.disableSubmitButton(newPlacePopupForm);
  addNewPlacePopup.open();
});

// Validation
  // edit user profile form validator
const editProfileFormValidator = new FormValidator(validationSettings , editProfileForm);
editProfileFormValidator.enableValidation();

  // add new place form validator
const newPlacePopupFormValidator = new FormValidator(validationSettings , newPlacePopupForm);
newPlacePopupFormValidator.enableValidation();

//TODO утро 28.03
/*
1) создать папку компонентс, туда закинуть все классы
  -- поменять пути при импортах к ним

2) Создать папку utils
  -- засунуть туда файл констант + переменные
  -- скорее всего туда же пойдет файл utils.js с функциями (почитай чеклист)

3) почистить файл констант и файлы классов от коментов и неиспользуемых переменных

4) возможно разобать папку ДАТА и исправить пути к ней (положить в utils)


! В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.


*/
