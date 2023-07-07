import { profileName, profileJob } from "../scripts/constants.js";

class UserInfo {
  constructor({ userName, userInfo, profileNameElement, profileJobElement }) {
    this._name = userName;
    this._info = userInfo;
    this._profileNameElement = profileNameElement;
    this._profileJobElement = profileJobElement;
  }

  getUserInfo() {
    this._name.value = profileName.textContent;
    this._info.value = profileJob.textContent;
  }

  setUserInfo(name, info) {
    this._profileNameElement.textContent = name;
    this._profileJobElement.textContent = info;
  }
}

export default UserInfo;
