let editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
let editProfileCloseButton = document.querySelector('.popup__close-button');
let editProfilePopupWindow = document.querySelector('.popup_type-edit');

let editProfileForm = document.querySelector('.popup__form');
let editProfileUserNameInput = editProfileForm.querySelector('.popup-input__name');
let editProfileUserJobInput = editProfileForm.querySelector('.popup-input__job');

let currentUserName = document.querySelector('.user-profile__name');
let currentUserJob = document.querySelector('.user-profile__description');

function openPopupEditUserProfile() {
  editProfilePopupWindow.classList.toggle('popup_opened');
  editProfileUserNameInput.value = currentUserName.textContent;
  editProfileUserJobInput.value = currentUserJob.textContent;
}

function closePopupEditUserProfile() {
  editProfilePopupWindow.classList.toggle('popup_opened');
}

editProfileOpenButton.addEventListener('click', openPopupEditUserProfile);
editProfileCloseButton.addEventListener('click', closePopupEditUserProfile);


function editProfileFormSubmitHandler(event) {
  event.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  let newUserName = editProfileUserNameInput.value;
  let newUserJob = editProfileUserJobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  currentUserName.textContent = newUserName;
  currentUserJob.textContent = newUserJob;

  closePopupEditUserProfile();
  // Вставьте новые значения с помощью textContent
}

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
