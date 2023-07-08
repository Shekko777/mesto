import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupFigcaption = this._popupElement.querySelector(
      ".popup-images__figcaption"
    );
    this._popupImage = this._popupElement.querySelector(".popup-images__img");
  }

  open(imageTitle, imageSrc) {
    super.open();
    this._popupImage.src = imageSrc;
    this._popupFigcaption.textContent = imageTitle;
    this._popupImage.alt = imageTitle;
  }
}

export default PopupWithImage;
