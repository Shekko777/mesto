import Popup from "./Popup";

class PopupConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  handleCallBackFunction(callBack) {
    this._handleCallBackFunction = callBack;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCallBackFunction();
      this.close();
    });
  }
}

export default PopupConfirm;
