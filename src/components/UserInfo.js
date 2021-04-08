class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, avatarSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userDescriptionElem = document.querySelector(userDescriptionSelector);
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    return {
      currentUserName: this._userNameElem.textContent,
      currentUserDescription: this._userDescriptionElem.textContent
    }
  }

  setUserInfo({name, about}) {
    this._userNameElem.textContent = name;
    this._userDescriptionElem.textContent = about;
  }
}
export default UserInfo;
