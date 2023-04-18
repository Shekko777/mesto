const popup = document.querySelector(".popup"); //Сам popup
const likeButtons = document.querySelectorAll(".elements__like"); //Сердечки на карточках
const formInputs = document.querySelectorAll(".popup__input"); //Инпуты формы
const formSaveSubmit = document.querySelector(".popup__save-btn"); //Кнопка сохранения формы
const profileName = document.querySelector(".profile__title"); //Имя в профиле
const profileJob = document.querySelector(".profile__subtitle"); //Профессия в профиле
const profileEditor = document.querySelector(".profile__edit-btn"); //Кнопка изменения профиля
const images = document.querySelectorAll(".elements__img"); //Картинки
const inputValueName = document.querySelector(".popup__input_place_title"); //Имя профиля
const inputValueJob = document.querySelector(".popup__input_place_subtitle"); //Профессия
const profileEditorClose = document.querySelector(".popup__close"); //Крестик закрытия редактирования

// Функция изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  popup.classList.remove("popup_opened"); //Закроет редактирование при сохранении
}

formSaveSubmit.addEventListener("submit", handleFormSubmit);

// Открытие профиля
function openPopup() {
  popup.classList.add("popup_opened");
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
}

profileEditor.addEventListener("click", openPopup);

// Закрытие редактирования профиля
function closePopup() {
  popup.classList.remove("popup_opened");
}

profileEditorClose.addEventListener("click", closePopup);
