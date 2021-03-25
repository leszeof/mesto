class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userDescriptionElem = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      currentUserName: this._userNameElem.textContent,
      currentUserDescription: this._userDescriptionElem.textContent
    }
  }

  setUserInfo({newName, newDescription}) {
    this._userNameElem.textContent = newName;
    this._userDescriptionElem.textContent = newDescription;
  }
}
export default UserInfo;
