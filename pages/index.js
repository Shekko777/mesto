// Импортирование элементов из '../scripts/'
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { openPopup, closePopup } from "../scripts/utils.js";
// Создаём карточки из коробки
initialCards.forEach((card) => {
  const newCard = new Card(card, templateCard);
  const cardElement = newCard.generateCard();
  cardListContainer.append(cardElement);
});

// Функция изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  closePopup(popupEdit);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

// Проверка валидности формы добавления карточки
const validateAddForm = new FormValidator(formObject, popupAddForm);
validateAddForm.enableValidation();

// Функция открытия попапа с добавлением карточки
function opepAddCardPopup(popupElement) {
  validateAddForm.resetError();
  openPopup(popupElement);
  popupAddForm.reset();
}

// Проверка валидности редактирования профиля
const validateProfileForm = new FormValidator(formObject, formProfile);
validateProfileForm.enableValidation();

// Функция открытия редактирования профиля
function openProfilePopup(popupElement) {
  validateProfileForm.resetError();
  openPopup(popupElement);
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
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
  const objectDataFields = {
    name: popupAddName.value,
    link: popupAddLink.value,
  };
  const addNewCard = new Card(objectDataFields, templateCard);
  cardListContainer.prepend(addNewCard.generateCard());
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
