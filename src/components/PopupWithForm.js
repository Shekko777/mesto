import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submit }) {
    super(popupSelector);
    this._submit = submit;
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
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
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }
}

export default PopupWithForm;
