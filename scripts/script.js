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
const newCardPopupWindow = document.querySelector('.popup.popup_type_add-place');
const newPlacePopupOpenButton = document.querySelector('.user-profile__add-button');
const newPlacePopupCloseButton = newCardPopupWindow.querySelector('.popup__close-button');
const newPlacePopupForm = newCardPopupWindow.querySelector('.popup__form');
const newPlaceInput = newPlacePopupForm.querySelector('.popup-form__input_type_place');
const newPlaceImageLinkInput = newPlacePopupForm.querySelector('.popup-form__input_type_link');

  // image preview popup
const imagePreviewPopupWindow = document.querySelector('.popup.popup_type_image-preview');
const imagePreviewCloseButton = imagePreviewPopupWindow.querySelector('.popup__close-button');

  // like card //! выкинуть нах, не нужно
// let likeButtons = document.querySelectorAll('.cards-item__like-button');

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
    newCardPopupWindow.classList.add('popup_opened');
  } else if (popup.classList.contains('popup_type_image-preview')) {
    fillImagePreviewPopup(event); // не совсем ясно в каком порядке это надо делать
    imagePreviewPopupWindow.classList.add('popup_opened');
    // инициируется запуск функции, которая будет наполнять модалку
    // например event.target.src (картинка на которой клик) + event.target.alt вынимаем
  }
}

function closePopup(popup) {
  if (popup.classList.contains('popup_type_edit')) {
    editProfilePopupWindow.classList.remove('popup_opened');
    //! очистку полей сюда засунуть и все что было в той функции
  } else if (popup.classList.contains('popup_type_add-place')) {
    newCardPopupWindow.classList.remove('popup_opened');
    //! очистку полей сюда засунуть и все что было в той функции
  } else if (popup.classList.contains('popup_type_image-preview')) {
    imagePreviewPopupWindow.classList.remove('popup_opened');
  }
}


//TODO убрать закрытие и открытие, будет одна общая функция на все, не забыть переделать eventListener внизу! (либо отдельные которые, либо которые в функции навешиваются)
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

///



  // update user profile
function editProfile(event) {
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
  console.log(event.target.id); //!убрать

  event.target.closest('li').remove() //! рабочее удаление элемента из верстки
}

// renders cards on start
function renderInitialCards(arrayOfCards) {
  let cardsContainer = document.querySelector('.cards__list');
  //! убрать let cardItemTemplate = document.querySelector('.template-card-item').content;

  //! вариант 1 = через for (рабочий)
  // for (let i = 0; i < arrayOfCards.length; i++) {
  //   let cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);
  //   const { name, link } = arrayOfCards[i];
  //   cardElement.querySelector('.cards-item__image').src = link;
  //   cardElement.querySelector('.cards-item__image').alt = name;
  //   cardElement.querySelector('.cards-item__title').textContent = name;
  //   cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton); // альтернативное решение с лайками (вроде самое адекватное)

  //   // кнопка удаления
  //   cardElement.querySelector('.cards-item__delete-button').addEventListener('click', deleteCard);

  //   cardsContainer.prepend(cardElement);
  // }


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


  //! вариант 4, для рефакторинга (запускает конструкцию на массиве, затем идет в функцию newCardFunction2, которая вернет карточки поштучно)
  let readyCards = arrayOfCards.map( (item) => {
    let newCard= generateNewCard(item.name, item.link);
    return newCard;
  })

  cardsContainer.prepend(...readyCards);
}
renderInitialCards(initialCards);


function addNewPlace(event) {
  event.preventDefault();

  let cardsContainer = document.querySelector('.cards__list');
  console.log(newPlaceInput);
  const newPlace = newPlaceInput.value;
  const newPlaceImageLink = newPlaceImageLinkInput.value;

  let newCard = generateNewCard(newPlace, newPlaceImageLink);

  cardsContainer.prepend(newCard);
  closePopup(newCardPopupWindow);
  //! перенести в closeModal()
  newPlaceImageLinkInput.value = '';
  newPlaceInput.value = '';
}


function generateNewCard(name, link) {
  let cardItemTemplate = document.querySelector('.template-card-item').content;
  let cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);
  cardElement.querySelector('.cards-item__image').src = link;
  cardElement.querySelector('.cards-item__image').alt = name;
  cardElement.querySelector('.cards-item__title').textContent = name;

  // event-listeners
  cardElement.querySelector('.cards-item__image').addEventListener('click', () => {
    openPopup(imagePreviewPopupWindow);
  });
  cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton); // альтернативное решение с лайками (вроде самое адекватное)
  cardElement.querySelector('.cards-item__delete-button').addEventListener('click', deleteCard); // кнопка удаления, слушатель

  return cardElement;
}


function fillImagePreviewPopup(event) {
  // функция, которая будет наполнять сам попап картинкой + подпись
  console.log(event);

  //! в целом переменные можно выкинуть? посмотри чеклист
  const image = event.target.src;
  const caption = event.target.alt;

  const imagePreview = document.querySelector('.popup__image');
  const imageCaption = document.querySelector('.popup__image-caption')

  imagePreview.src = image;
  imageCaption.textContent = caption
}

// event listeners
  // event listeners for user profile popup
editProfileOpenButton.addEventListener('click', openPopupEditUserProfile);
editProfileCloseButton.addEventListener('click', closePopupEditUserProfile);
editProfileForm.addEventListener('submit', editProfile);

  // event listeners for add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  openPopup(newCardPopupWindow);
})
newPlacePopupCloseButton.addEventListener('click', () => {
  closePopup(newCardPopupWindow);
})
newPlacePopupForm.addEventListener('submit', addNewPlace)

  // event listeners for image preview popup
imagePreviewCloseButton.addEventListener('click', () => {
  closePopup(imagePreviewPopupWindow);
});


  //! event listeners for like-buttons -- убрал, так как уже не актуально стало (вешаем при рендеринге и создании карточек этого слушателя)
// likeButtons.forEach( (button) => {
//   button.addEventListener('click', setLikeButton)
// })


