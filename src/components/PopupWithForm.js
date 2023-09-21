import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submit }) {
    super(popupSelector);
    this._submit = submit;
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._textButton =
      this._popupElement.querySelector(".popup__save-btn").textContent;
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

  // preloadAnimation(boolean) {
  //   if (boolean) {
  //     this._textButton.textContent = "Сохранение...";
  //   } else {
  //     this._textButton.textContent = this._textButton;
  //   }
  // }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
      this._form.reset();
    });
  }
}

export default PopupWithForm;
