// variables
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
  // open popup, universal function
function openPopup(popup, event) {
  if (popup.classList.contains('popup_type_edit-profile')) {
    editProfilePopupWindow.classList.add('popup_opened');
    editProfileUserNameInput.value = currentUserName.textContent;
    editProfileUserJobInput.value = currentUserJob.textContent;

  } else if (popup.classList.contains('popup_type_add-place')) {
    newCardPopupWindow.classList.add('popup_opened');

  } else if (popup.classList.contains('popup_type_image-preview')) {
    fillImagePreviewPopup(event);

    imagePreviewPopupWindow.classList.add('popup_opened');
  }
}

  // close popup, universal function
function closePopup(popup) {
  if (popup.classList.contains('popup_type_edit-profile')) {
    editProfilePopupWindow.classList.remove('popup_opened');

  } else if (popup.classList.contains('popup_type_add-place')) {
    newCardPopupWindow.classList.remove('popup_opened');
    newPlaceImageLinkInput.value = '';
    newPlaceInput.value = '';

  } else if (popup.classList.contains('popup_type_image-preview')) {
    imagePreviewPopupWindow.classList.remove('popup_opened');
  }
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
  if (event.target.classList.contains('cards-item__like-button_active')) {
    event.target.classList.toggle('cards-item__like-button_active');
  } else {
    event.target.classList.toggle('cards-item__like-button_active');
  }
}

// delete card function
function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}

// renders cards on start
function renderInitialCards(rawArrayOfCards) {
  const cardsContainer = document.querySelector('.cards__list');

  const renderedCards = rawArrayOfCards.map( (item) => {
    const newCard= generateNewCard(item.name, item.link);
    return newCard;
  })

  cardsContainer.prepend(...renderedCards);
}
renderInitialCards(initialCards);

// add new card function
function addNewPlace(event) {
  event.preventDefault();

  const cardsContainer = document.querySelector('.cards__list');
  const newPlaceName = newPlaceInput.value;
  const newPlaceImageLink = newPlaceImageLinkInput.value;
  const newCard = generateNewCard(newPlaceName, newPlaceImageLink);
  cardsContainer.prepend(newCard);

  closePopup(newCardPopupWindow);
}

// generate a card
function generateNewCard(name, link) {
  const cardItemTemplate = document.querySelector('.template-card-item').content;
  const cardElement = cardItemTemplate.querySelector('.cards-item').cloneNode(true);
  cardElement.querySelector('.cards-item__image').src = link;
  cardElement.querySelector('.cards-item__image').alt = name;
  cardElement.querySelector('.cards-item__title').textContent = name;

  // event-listeners
  cardElement.querySelector('.cards-item__image').addEventListener('click', (event) => {
    openPopup(imagePreviewPopupWindow, event);
  });
  cardElement.querySelector('.cards-item__like-button').addEventListener('click', setLikeButton);
  cardElement.querySelector('.cards-item__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

// insert new content in preview image popup
function fillImagePreviewPopup(event) {
  const image = event.target.src;
  const title = event.target.alt;

  const imagePreview = document.querySelector('.popup__image');
  const imageCaption = document.querySelector('.popup__image-caption');

  imagePreview.src = image;
  imagePreview.alt = title;
  imageCaption.textContent = title;
}

// global event listeners
  // event listeners for user profile popup
editProfileOpenButton.addEventListener('click', () => {
  openPopup(editProfilePopupWindow);
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
newPlacePopupForm.addEventListener('submit', addNewPlace);

  // event listeners for image preview popup
imagePreviewCloseButton.addEventListener('click', () => {
  closePopup(imagePreviewPopupWindow);
});
