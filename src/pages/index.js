// Imports
  // css
import './index.css';
  // classes
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/API.js';
  // constants
import {
  initialCards,
  validationSettings,
  editProfileOpenButton,
  editProfileForm,
  editProfileUserNameInput,
  editProfileUserJobInput,
  newPlacePopupOpenButton,
  newPlacePopupForm,
  userAvatarElem,
  editUserAvatarPopupForm,
  userProfileSelectors,
} from '../utils/constants.js';

//! API Connection
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '098e56f1-8498-493a-8138-2fc5a6b46ab9',
    'Content-Type': 'application/json'
  }
});

// generate initial cards
api.getInitialCards()
  .then(cards => {
    cardsSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const newCardElement = createCard(cardData, '.cards-item', handleCardClick);
          cardsSection.addItem(newCardElement);
        },
      },
      '.cards__list'
    );

    cardsSection.renderItems(); //! если поставить эту строку вне этого, то будет cardsSection = undefined
  })

// Classes in use
  // Popup classes
  // edit profile popup controller copy
const editProfilePopup = new PopupWithForm(
  '.popup_type_edit-profile',
  updateProfile,
  () => {
    editProfileFormValidator.resetValidation();
  }
);
editProfilePopup.setEventListeners();

  // add new place popup controller copy
const addNewPlacePopup = new PopupWithForm(
  '.popup_type_add-place',
  submitNewCardHandler,
  () => {
    newPlacePopupFormValidator.resetValidation();
  }
);
addNewPlacePopup.setEventListeners();

  // image preview popup controller copy
const imagePreviewPopup = new PopupWithImage(
  '.popup_type_image-preview',
  handleCardClick
);
imagePreviewPopup.setEventListeners();

  // edit avatar popup controller copy
const editUserAvatarPopup = new PopupWithForm(
  '.popup_type_edit-avatar',
  //! нужна нормальная функция-хэндлер для отправки
  () => {
    console.log('editUserAvatarPopup submit handler');
  },
  () => {
    editUserAvatarPopupFormValidator.resetValidation();
  }
);
editUserAvatarPopup.setEventListeners();

  // UserInfo class
const userInfo = new UserInfo(userProfileSelectors);

  // Section class
let cardsSection;
// api.getInitialCards()
//   .then( (cards) => {
//     cardsSection = new Section(
//       {
//         items: cards,
//         renderer: (cardData) => {
//           const newCardElement = createCard(cardData, '.cards-item', handleCardClick);
//           cardsSection.addItem(newCardElement);
//         },
//       },
//       '.cards__list'
//     );

//     cardsSection.renderItems(); //! если поставить эту строку вне этого, то будет cardsSection = undefined
//   })

//! прежняя функция рендеринга стартовых карточек
// const cardsSection = new Section(
//   {
//     items: initialCards, //! вот сюда надо загонять карточки из API
//     renderer: (cardData) => {
//       const newCardElement = createCard(cardData, '.cards-item', handleCardClick);
//       cardsSection.addItem(newCardElement);
//     },
//   },
//   '.cards__list'
// );
// renders cards on start
// cardsSection.renderItems();

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

// Event listeners
  // Event listeners for user profile popup
  // open user profile popup
editProfileOpenButton.addEventListener('click', () => {
  setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

  // Event listeners for add place popup
  // open add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  newPlacePopupFormValidator.disableSubmitButton(newPlacePopupForm);
  addNewPlacePopup.open();
});

  // Event listeners for edit user avatar
userAvatarElem.addEventListener('click', () => {
  editUserAvatarPopup.open();
})

// Validation
  // edit user profile form validator
const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();

  // add new place form validator
const newPlacePopupFormValidator = new FormValidator(validationSettings, newPlacePopupForm);
newPlacePopupFormValidator.enableValidation();

  // edit user avatar form validator
const editUserAvatarPopupFormValidator = new FormValidator(validationSettings, editUserAvatarPopupForm);
editUserAvatarPopupFormValidator.enableValidation();
