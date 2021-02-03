// variables
  // user profile popup variables
const editProfileOpenButton = document.querySelector('.user-profile__edit-profile-button');
const editProfileCloseButton = document.querySelector('.popup__close-button');
const editProfilePopupWindow = document.querySelector('.popup');
const editProfileForm = document.querySelector('.popup__form');
const editProfileUserNameInput = editProfileForm.querySelector('.popup-form__input_type_name');
const editProfileUserJobInput = editProfileForm.querySelector('.popup-form__input_type_job');
const currentUserName = document.querySelector('.user-profile__name');
const currentUserJob = document.querySelector('.user-profile__description');

  // like variables
const likeButtons = document.querySelectorAll('.cards-item__like-button');

// Functions
// user profile popup functions
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

// like button function
function setLikeButton(event) {
  if (event.target.classList.contains('cards-item__like-button_active')) {
    event.target.classList.toggle('cards-item__like-button_active')
  } else {
    event.target.classList.toggle('cards-item__like-button_active')
  }
}

// event listeners
  // event listeners for user profile popup
editProfileOpenButton.addEventListener('click', openPopupEditUserProfile);
editProfileCloseButton.addEventListener('click', closePopupEditUserProfile);
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

  // event listeners for like-buttons
likeButtons.forEach( (button) => {
  button.addEventListener('click', setLikeButton)
})
