function closePopupTouchOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Закрытие при нажатии на Escape
function closePopupKeydownEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupTouchOverlay);
  document.addEventListener("keydown", closePopupKeydownEscape);
}

// Функция закрытия формы
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("mousedown", closePopupTouchOverlay);
  document.removeEventListener("keydown", closePopupKeydownEscape);
}

export { openPopup, closePopup };
