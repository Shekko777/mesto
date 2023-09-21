import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submit }) {
    super(popupSelector);
    this._submit = submit;
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formButton = this._popupElement.querySelector(".popup__save-btn");
    this._textButton = this._formButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
  }

  preloadAnimation(boolean, text) {
    if (boolean) {
      this._formButton.textContent = text;
    } else {
      this._formButton.textContent = this._textButton;
      this._form.reset();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
