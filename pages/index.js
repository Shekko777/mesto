// Импортирование элементов из '../scripts/'
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";

// Создаём карточки из коробки
initialCards.forEach((card) => {
  const newCard = new Card(templateCard);
  const cardElement = newCard.generateCard(card.name, card.link);
  cardListContainer.append(cardElement);
});

// Функция закрытия формы
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// Закрытие при нажатии на оверлей
function closePopupTouchOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
    evt.target.removeEventListener("mousedown", closePopupTouchOverlay);
  }
}

popupImage.addEventListener("click", closePopupTouchOverlay);

// Закрытие при нажатии на Escape
function closePopupKeydownEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
    document.removeEventListener("keydown", closePopupKeydownEscape);
  }
}

// Функция открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupTouchOverlay);
  document.addEventListener("keydown", closePopupKeydownEscape);
}

// Функция изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  closePopup(popupEdit);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

// Функция сброса ошибок
function resetError(errorSpan, inputElement, buttonElement) {
  errorSpan.classList.remove("popup__error_visible");
  errorSpan.textContent = "";
  inputElement.classList.remove("popup__input_type_error");
  buttonElement.disabled = true;
  buttonElement.classList.add("popup__save-btn_disabled");
}

// Сброс ошибок полей в попапах ниже
function resetErrorsWhenOpenPopup(popupElement) {
  const inputsList = popupElement.querySelectorAll(".popup__input");
  const buttonForm = popupElement.querySelector(".popup__save-btn");
  inputsList.forEach((inputElement) => {
    const errorSpan = popupElement.querySelector(`#${inputElement.name}-error`);
    resetError(errorSpan, inputElement, buttonForm);
  });
}

// Функция открытия редактирования профиля
function openProfilePopup(popupElement) {
  resetErrorsWhenOpenPopup(popupElement);
  openPopup(popupElement);
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
}

// Функция открытия попапа с добавлением карточки
function opepAddCardPopup(popupElement) {
  resetErrorsWhenOpenPopup(popupElement);
  openPopup(popupElement);
  popupAddForm.reset();
}

profileEditor.addEventListener("click", () => {
  openProfilePopup(popupEdit);
});
profileAdd.addEventListener("click", () => {
  opepAddCardPopup(popupAdd);
});

// Добавления карточки
function addNewsCard(evt) {
  evt.preventDefault();
  const addNewCard = new Card(templateCard);
  cardListContainer.prepend(
    addNewCard.generateCard(popupAddName.value, popupAddLink.value)
  );
  closePopup(popupAdd);
}

popupAddForm.addEventListener("submit", addNewsCard);

// Закрытие открытых попапов
buttonCloseElement.forEach((button) => {
  button.addEventListener("click", () => {
    const openedPopup = button.closest(".popup_opened");
    closePopup(openedPopup);
  });
});

// Проверка формы на валидность через класс
const formValidate = new FormValidator(formObject);
formValidate.enableValidation();
