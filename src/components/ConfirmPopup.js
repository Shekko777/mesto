import Popup from "./Popup";

class PopupConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._formButton = this._popupElement.querySelector(".popup__save-btn");
    this._textButton = this._formButton.textContent;
  }

  // Колбэк при выполнении
  handleCallBackFunction(callBack) {
    this._handleCallBackFunction = callBack;
  }

  // Анимация прогрузки
  preloadAnimation(boolean, text) {
    if (boolean) {
      this._formButton.textContent = text;
    } else {
      this._formButton.textContent = this._textButton;
    }
  }

  // Навешивание событий
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCallBackFunction();
    });
  }
}

export default PopupConfirm;
