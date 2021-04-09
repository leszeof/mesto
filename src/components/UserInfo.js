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
    }
  }

  // set user info
  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }

  setUserAvatar({avatar}) {
    this._userAvatar.src = avatar;
  }
}
export default UserInfo;
