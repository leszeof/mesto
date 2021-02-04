// variables
  // user profile popup
const editProfilePopupWindow = document.querySelector('.popup.popup_type_edit-profile');
const editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
const editProfileCloseButton = editProfilePopupWindow.querySelector('.popup__close-button');
const editProfileForm = editProfilePopupWindow.querySelector('.popup__form');
const editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_type_name');
const editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_type_job');
const currentUserName = document.querySelector('.user-profile__name');
const currentUserJob = document.querySelector('.user-profile__description');

  // add new place popup
const addNewCardPopupWindow = document.querySelector('.popup.popup_type_add-place');
const addCardOpenButton = document.querySelector('.user-profile__add-button');
const addCardCloseButton = addNewCardPopupWindow.querySelector('.popup__close-button');
const addCardForm = addNewCardPopupWindow.querySelector('.popup__form');
const addCardNewPlaceInput = editProfileForm.querySelector('.popup-form__input_type_place');
const addCardNewPlaceLinkInput = editProfileForm.querySelector('.popup-form__input_type_link');

  // like card //! выкинуть нах, не нужно
let likeButtons = document.querySelectorAll('.cards-item__like-button');

  // initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Functions
function openPopup(popup) {
  if (popup.classList.contains('popup_type_edit')) {
    editProfilePopupWindow.classList.add('popup_opened');
    editProfileUserNameInput.value = currentUserName.textContent;
    editProfileUserJobInput.value = currentUserJob.textContent;
  } else if (popup.classList.contains('popup_type_add-place')) {
    addNewCardPopupWindow.classList.add('popup_opened');
  }

}

function closePopup(popup) {
  if (popup.classList.contains('popup_type_edit')) {
    editProfilePopupWindow.classList.remove('popup_opened');
  } else if (popup.classList.contains('popup_type_add-place')) {
    addNewCardPopupWindow.classList.remove('popup_opened');
  }
}



// user profile popup
  // open user profile popup
function openPopupEditUserProfile() {
  editProfilePopupWindow.classList.add('popup_opened');
  editProfileUserNameInput.value = currentUserName.textContent;
  editProfileUserJobInput.value = currentUserJob.textContent;
}

  // close user profile popup
function closePopupEditUserProfile() {
  editProfilePopupWindow.classList.remove('popup_opened');
}

  // update user profile
function editProfileFormSubmitHandler(event) {
  event.preventDefault();

  const newUserName = editProfileUserNameInput.value;
  const newUserJob = editProfileUserJobInput.value;

  currentUserName.textContent = newUserName;
  currentUserJob.textContent = newUserJob;

  closePopupEditUserProfile();
}

// like card function
function setLikeButton(event) {
  if (event.target.classList.contains('cards-item__like-button_active')) {
    event.target.classList.toggle('cards-item__like-button_active');
  } else {
    event.target.classList.toggle('cards-item__like-button_active');
  }
}

// delete card function
function deleteCard(event) {
  //console.log(event.target.closest('li'));
  console.log(event.target.id);

  event.target.closest('li').remove() //! рабочее удаление элемента из верстки
}

// renders cards on start
function renderInitialCards(arrayOfCards) {
  let cardsContainer = document.querySelector('.cards__list');
  let cardItemTemplate = document.querySelector('.template-card-item').content;

  //! вариант 1 = через for (рабочий)
  for (let i = 0; i < arrayOfCards.length; i++) {
    let cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);
    const { name, link } = arrayOfCards[i];
    cardElement.querySelector('.cards-item__image').src = link;
    cardElement.querySelector('.cards-item__image').alt = name;
    cardElement.querySelector('.cards-item__title').textContent = name;
    cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton); // альтернативное решение с лайками (вроде самое адекватное)

    // кнопка удаления
    cardElement.querySelector('.cards-item__delete-button').addEventListener('click', deleteCard);

    cardsContainer.prepend(cardElement);
  }


  //! вариант 2 = через map (рабочий)
  // let readyCards = arrayOfCards.map( (card) => {
  //   let cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);
  //   cardElement.querySelector('.cards-item__image').src = card.link;
  //   cardElement.querySelector('.cards-item__image').alt = card.name;
  //   cardElement.querySelector('.cards-item__title').textContent = card.name;

  //   // event listener for like-button
  //   cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton); // альтернативное решение с лайками (вроде самое адекватное)

  //   return cardElement;
  // })
  // cardsContainer.prepend(...readyCards);
  // likeButtons = document.querySelectorAll('.cards-item__like-button'); // решение для лайков, скорее всего плохое


  //! вариант 3 = через forEach (рабочий)
  // arrayOfCards.forEach( (card) => {
  //   let cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);
  //   cardElement.querySelector('.cards-item__image').src = card.link;
  //   cardElement.querySelector('.cards-item__image').alt = card.name;
  //   cardElement.querySelector('.cards-item__title').textContent = card.name;
  //   cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton); // альтернативное решение с лайками (вроде самое адекватное)

  //   cardsContainer.prepend(cardElement);
  // })

}
renderInitialCards(initialCards);





// event listeners
  // event listeners for user profile popup
editProfileOpenButton.addEventListener('click', openPopupEditUserProfile);
editProfileCloseButton.addEventListener('click', closePopupEditUserProfile);
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

  // event listeners for add place popup
addCardOpenButton.addEventListener('click', () => {
  openPopup(addNewCardPopupWindow);
})
addCardCloseButton.addEventListener('click', () => {
  closePopup(addNewCardPopupWindow);
})


  //! event listeners for like-buttons -- убрал, так как уже не актуально стало (вешаем при рендеринге и создании карточек этого слушателя)
// likeButtons.forEach( (button) => {
//   button.addEventListener('click', setLikeButton)
// })


