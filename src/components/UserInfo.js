class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, avatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    // this._avatarSelector = avatarSelector;
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      currentUserName: this._userName.textContent,
      currentUserDescription: this._userDescription.textContent
    };
  }

  getUserId() {
    return this._userId;
  }

  // set user info (on submit and on start)
  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }

  // set user id on start
  setUserId({_id}) {
    this._userId = _id;
  }

  // set user avatar (on submit and on start)
  setUserAvatar({avatar}) {
    this._userAvatar.src = avatar;
  }
}
export default UserInfo;
