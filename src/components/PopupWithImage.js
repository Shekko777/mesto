import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({ popupSelector, imageTitle, imageSrc }) {
    super(popupSelector);
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._imageTitle = imageTitle;
    this._imageSrc = imageSrc;
  }

  open() {
    super.open();
    this._popupElement.querySelector(".popup-images__img").src = this._imageSrc;
    this._popupElement.querySelector(".popup-images__figcaption").textContent =
      this._imageTitle;
    this._popupElement.querySelector(".popup-images__img").alt =
      this._imageTitle;
  }
}

export default PopupWithImage;
