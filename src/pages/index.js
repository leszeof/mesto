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

let cardsSection;


//! API Connection
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '098e56f1-8498-493a-8138-2fc5a6b46ab9',
    'Content-Type': 'application/json'
  }
});

// render initial cards on start using API
api.getInitialCards()
  .then( (cards) => {
    cardsSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const newCardElement = createCard(cardData, '.cards-item');
          cardsSection.addItem(newCardElement);
        },
      },
      '.cards__list'
    );

    cardsSection.renderItems();
  })

// render user info on start using API
api.getUserInfo()
  .then( (userData) => {
    fillUserInfoOnStart(userData, userProfileSelectors);
  })

  //! либо лучше создать 2 переменные (name и description + использовать их в классе userInfo)
function fillUserInfoOnStart({name, about, avatar}, {userNameSelector, userDescriptionSelector}) {
  document.querySelector(userNameSelector).textContent = name;
  document.querySelector(userDescriptionSelector).textContent = about;
  userAvatarElem.src = avatar;
}






// Classes in use
  // Popup classes
  // edit profile popup controller copy
const editProfilePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_edit-profile',
    submitFormHandler: updateProfile,
    validationHandler: () => {
      editProfileFormValidator.resetValidation();
    }
  }
);
editProfilePopup.setEventListeners();

  // add new place popup controller copy
const addNewPlacePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_add-place',
    submitFormHandler: submitNewCardHandler,
    validationHandler: () => {
      newPlacePopupFormValidator.resetValidation();
    },
  }
);
addNewPlacePopup.setEventListeners();

  // image preview popup controller copy
const imagePreviewPopup = new PopupWithImage('.popup_type_image-preview');
imagePreviewPopup.setEventListeners();

  // edit avatar popup controller copy
const editUserAvatarPopup = new PopupWithForm(
  {
    popupSelector:'.popup_type_edit-avatar',
    submitFormHandler: (formData) => {
      const newLink = formData['new-avatar-link'];
      api.postNewUserAvatar(newLink)
        .then( newSrc => {
          userAvatarElem.src = newSrc.avatar;
        });
    },
    validationHandler: () => {
      editUserAvatarPopupFormValidator.resetValidation();
    }
  }
);
editUserAvatarPopup.setEventListeners();

  // UserInfo class
const userInfo = new UserInfo(userProfileSelectors);


// Functions
  // set input values when opening edit profile popup
function setInputValues({currentUserName, currentUserDescription}) {
  editProfileUserNameInput.value = currentUserName;
  editProfileUserJobInput.value = currentUserDescription;
}

// callback function on submit edit user profile form
function updateProfile(formData) {
  // create and render new user info from form data
  const newInfo = {
    name: formData['new-user-name'],
    about: formData['new-user-description']
  };

  // render new user info
  userInfo.setUserInfo(newInfo);

  // post new user info to server
  api.updateUserInfo(newInfo);
}

// callback function for imagePreviewPopup copy of PopupWithImage class
function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// add new card callback function on submit add new place form
function submitNewCardHandler(formData) {
  // create and render card element from form data
  const newCardData = {
    name: formData['new-place-name'],
    link: formData['new-place-link']
  };
  const newCardElement = createCard(newCardData, '.cards-item');
  cardsSection.addItem(newCardElement);

  // post new card to server
  api.postNewCard(newCardData);
}

// callback function for cardsSection copy of Section class
function createCard(rawCardItem) {
  const cardData = {
    name: rawCardItem.name,
    link: rawCardItem.link,
    likes: rawCardItem.likes.length,
    owner: rawCardItem.owner,
  }

  const card = new Card(cardData, '.cards-item', handleCardClick);
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
