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
// TODO внести imagePreview imageCaption  из модального окна в переменные, чтобы при запуске функций не искать их по новой
const imagePreview = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

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
const cardsContainer = document.querySelector('.cards__list');

// Functions
  // open any popup, universal function
function openPopup(popup) {
  if (popup.classList.contains('popup_type_edit-profile')) {
    editProfilePopupWindow.classList.add('popup_opened');

  } else if (popup.classList.contains('popup_type_add-place')) {
    newCardPopupWindow.classList.add('popup_opened');

  } else if (popup.classList.contains('popup_type_image-preview')) {
    imagePreviewPopupWindow.classList.add('popup_opened');
  }
}

  // close any popup, universal function
function closePopup(popup) {
  if (popup.classList.contains('popup_type_edit-profile')) {
    editProfilePopupWindow.classList.remove('popup_opened');

  } else if (popup.classList.contains('popup_type_add-place')) {
    newCardPopupWindow.classList.remove('popup_opened');

  } else if (popup.classList.contains('popup_type_image-preview')) {
    imagePreviewPopupWindow.classList.remove('popup_opened');
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

  closePopup(editProfilePopupWindow);
}

// like card function
function setLikeButton(event) {
  event.target.classList.toggle('cards-item__like-button_active');
}

// delete card function
function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}

// add new place popup functions
  // add new card function
function addNewPlace(event) {
  event.preventDefault();

  const newPlaceName = newPlaceInput.value;
  const newPlaceImageLink = newPlaceImageLinkInput.value;
  const newCard = generateNewCard(newPlaceName, newPlaceImageLink);
  cardsContainer.prepend(newCard);

  closePopup(newCardPopupWindow);
}

  // clear inputs values when close add new place popup
function clearInputValues() {
  newPlaceImageLinkInput.value = '';
  newPlaceInput.value = '';
}

// card add functionality (on start and in progress)
  // renders cards on start
function renderInitialCards(rawArrayOfCards) {
  const renderedCards = rawArrayOfCards.map( (item) => {
    const newCard= generateNewCard(item.name, item.link);
    return newCard;
  })

  cardsContainer.prepend(...renderedCards);
}
renderInitialCards(initialCards);

  // generate a card at any moment
function generateNewCard(name, link) {
  const cardItemTemplate = document.querySelector('.template-card-item').content;
  const cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);

  const cardImage = cardElement.querySelector('.cards-item__image')
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.cards-item__title').textContent = name;

  // event-listeners
  cardElement.querySelector('.cards-item__image').addEventListener('click', (event) => {
    fillImagePreviewPopup(event);
    openPopup(imagePreviewPopupWindow);
  });
  cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton);
  cardElement.querySelector('.cards-item__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

// image preview popup functions
  // insert new content in preview image popup
function fillImagePreviewPopup(event) {
  const image = event.target.src;
  const title = event.target.alt;

  imagePreview.src = image;
  imagePreview.alt = title;
  imageCaption.textContent = title;
}

// Event listeners
  // event listeners for user profile popup
editProfileOpenButton.addEventListener('click', () => {
  setInputValues();
  openPopup(editProfilePopupWindow)
});
editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopupWindow);
});
editProfileForm.addEventListener('submit', editProfile);

  // event listeners for add place popup
newPlacePopupOpenButton.addEventListener('click', () => {
  openPopup(newCardPopupWindow);
});
newPlacePopupCloseButton.addEventListener('click', () => {
  closePopup(newCardPopupWindow);
});
newPlacePopupForm.addEventListener('submit', (event) => {
  addNewPlace(event);
  clearInputValues();
});

  // event listeners for image preview popup
imagePreviewCloseButton.addEventListener('click', () => {
  closePopup(imagePreviewPopupWindow);
});
