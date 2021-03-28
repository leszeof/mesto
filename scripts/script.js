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






// Popup classes in use
//   edit profile popup controller copy
const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  updateProfile
);
editProfilePopup.setEventListeners();

  // add new place popup controller copy
const addNewPlacePopup = new PopupWithForm(
  '.popup_type_add-place',
  addNewPlace
);
addNewPlacePopup.setEventListeners();


//! вот это вроде работает по канонам
  // image preview popup controller copy
const imagePreviewPopup = new PopupWithImage(
  '.popup_type_image-preview',
  handleCardClick
);
imagePreviewPopup.setEventListeners();


//! секция имени + описания юзера (хтмл)
const userInfo = new UserInfo(userProfileSelectors);

//! секция отрисовки карточек, экзепляр Section
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  '.cards__list'
);






// Functions
//TODO новые функции, которые используются как связки между классами либо при открытии/закрытии
//! работает при открытии модалки с данными юзера (подставляет данные)
//edit user profile popup functions
  // set input values when opening edit profile popup
function setInputValues({currentUserName, currentUserDescription}) {
  editProfileUserNameInput.value = currentUserName;
  editProfileUserJobInput.value = currentUserDescription;
}

//! функции колбэки под классы
// callback function for editProfilePopup copy of PopupWithForm class
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
//!









// add new place popup functions
  // add new card function

//! функция колбэк, которая нужна будет для отрисовки новой карточки после PopupWithForm класса
  //!addNewPlacePopup
function addNewPlace(formData) {
  const newCardData = {
    name: formData['new-place-name'],
    link: formData['new-place-link']
  };

  //! либо так (так было раньше)
  // const newCardElement = createCard(newCardData);

  //! либо так
  const card = new Card(newCardData, '.cards-item', handleCardClick);
  const cardElement = card.generateCard();

  cardsSection.addItem(cardElement);
}

//! функция колбэк, которая нужна будет для отрисовки новой карточки после PopupWithForm класса
// callback function for cardsSection copy of Section class
function createCard(rawCardItem) {
  const card = new Card(rawCardItem, '.cards-item', handleCardClick);
  const cardElement = card.generateCard();

  cardsSection.addItem(cardElement);
}



// renders cards on start
cardsSection.renderItems();


//TODO на вечер 27.03
/*
1) разобраться как добавить новую карточку в начало, а не конец (при добавлении 1 новой через форму)
2) почистить файл констант и файлы классов от коментов и неиспользуемых переменных
3) создать файл utils.js со всеми функциями общего назначения (и листенерами?), посмотри теорию


PS по моему это нормально, что новая карточка идет в конец!
*/





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
