// modal window, edit user profile

// variables
let editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
let editProfileCloseButton = document.querySelector('.popup__close-button');
let editProfilePopupWindow = document.querySelector('.popup');
let editProfileForm = document.querySelector('.popup__form');
let editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_type_name');
let editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_type_job');
let currentUserName = document.querySelector('.user-profile__name');
let currentUserJob = document.querySelector('.user-profile__description');

// open modal window function
function openPopupEditUserProfile() {
  editProfilePopupWindow.classList.add('popup_opened');
  editProfileUserNameInput.value = currentUserName.textContent;
  editProfileUserJobInput.value = currentUserJob.textContent;
}

// close modal window function
function closePopupEditUserProfile() {
  editProfilePopupWindow.classList.remove('popup_opened');
}

// update user info from modal window
function editProfileFormSubmitHandler(event) {
  event.preventDefault();

  let newUserName = editProfileUserNameInput.value;
  let newUserJob = editProfileUserJobInput.value;

  currentUserName.textContent = newUserName;
  currentUserJob.textContent = newUserJob;

  closePopupEditUserProfile();
}

// event listeners for edit user profile
editProfileOpenButton.addEventListener('click', openPopupEditUserProfile);
editProfileCloseButton.addEventListener('click', closePopupEditUserProfile);
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
