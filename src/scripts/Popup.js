export class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._closeButtonPopup = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.addEventListener(
      "click",
      this._handleOverlayClose.bind(this)
    );
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.removeEventListener(
      "click",
      this._handleOverlayClose.bind(this)
    );
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButtonPopup.addEventListener("click", this.close.bind(this));
  }
}
