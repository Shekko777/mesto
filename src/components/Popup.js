class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.addEventListener(
      "mousedown",
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
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", this.close.bind(this));
  }
}

export default Popup;
