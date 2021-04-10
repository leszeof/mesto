// Imports
  // css
import './index.css';
  // classes
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
  // constants
import {
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
  apiBasicSettings
} from '../utils/constants.js';

// Classes in use
// API class
const api = new Api(apiBasicSettings);

// render initial cards on start using API class
let cardsSection;
api.getInitialCards()
  .then( (cards) => {
    cardsSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const newCardElement = createCard(cardData);
          cardsSection.addItem(newCardElement);
        },
      },
      '.cards__list'
    );

    cardsSection.renderItems();
  })
  .catch( (error) => {
    console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
    // можно еще добавить индикатор загрузки
  });

// render user info on start using API class
api.getUserInfo()
  .then( (userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData);
  })
  .catch( (error) => {
    console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
    // можно еще добавить индикатор загрузки
  });




  // Popup classes
  // edit profile popup controller copy
const editProfilePopup = new PopupWithForm(
  {
    popupSelector: '.popup_type_edit-profile',
    submitFormHandler: updateUserInfo,
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

      api.updateUserAvatar(newLink)
        .then( newProfileData => {
          userInfo.setUserAvatar(newProfileData);
        })
        .catch( (error) => {
          console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
          // можно еще добавить индикатор загрузки
        })
        .finally( () => {
          editUserAvatarPopup.renderLoading(false);
          editUserAvatarPopup.close();
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
function setInputValuesOnOpen({currentUserName, currentUserDescription}) {
  editProfileUserNameInput.value = currentUserName;
  editProfileUserJobInput.value = currentUserDescription;
}

// callback function on submit edit user profile form (connected to API class)
function updateUserInfo(formData) {
  // create and render new user info from form data
  const newInfo = {
    name: formData['new-user-name'],
    about: formData['new-user-description']
  };

  // post new user info to server then render it
  api.updateUserInfo(newInfo)
    .then(userData => {
      userInfo.setUserInfo(userData);
    })
    .catch( (error) => {
      console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
      // можно еще добавить индикатор загрузки
    })
    .finally( () => {
      editProfilePopup.renderLoading(false);
      editProfilePopup.close();
    });
}

// callback function add new card on submit add new place form
function submitNewCardHandler(formData) {
  // prepare new card data
  const newCardData = {
    name: formData['new-place-name'],
    link: formData['new-place-link']
  };

  // post new card to server then render it
  api.postNewCard(newCardData)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      cardsSection.addItem(newCardElement);
    })
    .catch( (error) => {
      console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
    })
    .finally( () => {
      // можно еще добавить индикатор загрузки
      addNewPlacePopup.renderLoading(false);
      addNewPlacePopup.close();
    });
}

const deleteCardPopup = new PopupWithConfirm(
  {
    popupSelector: '.popup_type_delete-card',
    submitFormHandler: (cardToDelete, cardId) => {
      console.log('deleteCardPopup -> submitFormHandler');
      api.deleteCard(cardId)
        .then( () => {
          cardToDelete.deleteCard();
        })
        .catch( (error) => {
          console.log(error);
        })
        .finally( () => {
          deleteCardPopup.renderLoading(false);
          deleteCardPopup.close();
        });
    },
  }
);
deleteCardPopup.setEventListeners();

// callback function for creating new cards (on start and by user)
function createCard(rawCardData) {
  const card = new Card(
    {
      cardData: rawCardData, // было cardData
      cardSelector: '.cards-item',
      currentUserId: userInfo.getUserId(),

      // callback function for open imagePreviewPopup in Card class
      handleCardPreview: (name, link) => {
        imagePreviewPopup.open(name, link);
      },

      // callback function to delete card (connected to Api class)
      deleteCardHandler: (cardId) => {
        deleteCardPopup.open(card, cardId);
      },

      // callback function to like card (connected to Api class)
      likeCardHandler: (id, isLiked) => {
        if (isLiked) {
          api.deleteLike(id)
          .then( (updatedCardData) => {
            console.log('likeCardHandler -> card is already liked (IF)');
            card.updateLike(updatedCardData);
          })
          .catch( (error) => {
            console.log(error);
          })
        } else {
          api.putLike(id)
          .then( (updatedCardData) => {
            console.log('likeCardHandler -> card is NOT liked (ELSE)');
            card.updateLike(updatedCardData);
          })
          .catch( (error) => {
            console.log(error);
          })
        }
      },
    }
  );
  return card.generateCard();
}

// Event listeners
  // Event listeners for user profile popup
  // open user profile popup
editProfileOpenButton.addEventListener('click', () => {
  setInputValuesOnOpen(userInfo.getUserInfo());
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
