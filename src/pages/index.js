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

// render initial cards on start using API class
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
  .catch( (error) => {
    console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
    // можно еще добавить индикатор загрузки
  })

// render user info on start using API class
api.getUserInfo()
  .then( (userData) => {
    fillUserInfoOnStart(userData, userProfileSelectors);
  })
  .catch( (error) => {
    console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
    // можно еще добавить индикатор загрузки
  });

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
          userAvatarElem.src = newProfileData.avatar;
        })
        .catch( (error) => {
          console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
          // можно еще добавить индикатор загрузки
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
    });
}

// callback function for open imagePreviewPopup in Card class
function handleCardPreview(name, link) {
  imagePreviewPopup.open(name, link);
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
      const newCardElement = createCard(newCardData, '.cards-item');
      cardsSection.addItem(newCardElement);
    })
    .catch( (error) => {
      console.log(error); // в дальнейшем заменить на модальное окно с ошибкой
      // можно еще добавить индикатор загрузки
    });
}

// итого шаги
/*
1. создаем карточку, в корзинке зашит хэдлер удаляющего колбэка + анимации (после удаления)
  * контролировать будут ли анимации, если сервер не сможет осилить запрос

2. при нажатии на корзинку проваливаемся к хэндлер удаления КАРТОЧКИ
  3. в этом хэндлере открываем попап (экземпляр класса Попап-ов)
4. при нажатии ДА проваливаемся к хэндлер САБМИТА для ПОПАПА!
  5. в этом хэндлере обращаемся к апи, удаляем карточку с сервера
  6. в блоке then (index.js) для этого запроса мы проводим рендеринг удаления карточки (анимации + физическое удаление из верстки)

!нюансы:
* нам надо знать ВЛАДЕЛЬЦА карточки
* нам надо знать ID карточки (например публичный метод в классе Card - getCardID)


*/

const deleteCardPopup = new PopupWithConfirm(
  {
    popupSelector: '.popup_type_delete-card',
    submitFormHandler: () => {
      console.log('deleteCardPopup -> submitFormHandler');
    },
  }
);






deleteCardPopup.setEventListeners();

// callback function delete card in Card class (connected to API class)
function deleteCardHandler() {
  console.log('card -> deleteCardHandler');
  deleteCardPopup.open();
}

// callback function for creating new cards (on start and by user)
function createCard(rawCardData) {
  const cardData = {
    name: rawCardData.name,
    link: rawCardData.link,
    likes: rawCardData.likes.length,
    owner: rawCardData.owner,
  };

  //! на этапе создании карточки важно определить ты владелец ее или нет, если нет - передаем соответствующий буль и тогда иконку корзинки вообще не отрисовываем

  //! если isLiked, то надо закрасить лайк при отрисовке

  //! так же надо в классе создать функцию прибавления/убавления лайка при лайке

  // isOwner
  // isLiked

  //? может сразу rawCardItem передавать... (либо надо какую то подготовку делать в виде определения владельца, id и тд)
  const card = new Card(
    {
      cardData: cardData,
      cardSelector: '.cards-item',
      handleCardPreview: handleCardPreview,
      deleteCardHandler: deleteCardHandler,
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
