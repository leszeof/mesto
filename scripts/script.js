let editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
let editProfileCloseButton = document.querySelector('.popup__close-button');
let editProfilePopupWindow = document.querySelector('.popup_type-edit');

let editProfileForm = document.querySelector('.popup__form');
let editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_name');
let editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_job');

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

  let newUserName = editProfileUserNameInput.value;
  let newUserJob = editProfileUserJobInput.value;

  currentUserName.textContent = newUserName;
  currentUserJob.textContent = newUserJob;

  closePopupEditUserProfile();
}

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
