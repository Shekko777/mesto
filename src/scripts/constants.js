const templateCard = document.querySelector(".template-card").content; // Template для клонирования содержимого

// Popup изменения профиля
const inputValueName = document.querySelector(".popup__input_place_title"); //Имя профиля
const inputValueJob = document.querySelector(".popup__input_place_subtitle"); //Профессия
const profileName = document.querySelector(".profile__title"); //Имя в профиле
const profileJob = document.querySelector(".profile__subtitle"); //Профессия в профиле
const formProfile = document.querySelector(".popup__form_type_edit"); //Форма в popup-edit
const profileEditor = document.querySelector(".profile__edit-btn"); //Кнопка изменения профиля

// Popup добавления карточки
const popupAdd = document.querySelector(".popup_type_add"); // Popup добавления новой карточки
const profileAdd = document.querySelector(".profile__add-btn"); // Кнопка добавления карточки
const popupAddForm = document.querySelector(".popup__form_type_add"); // Форма добавления карточки

// Попап подтверждения
const popupFormConfirm = document.querySelector(".popup__form_type_delete");

// Попап подтверждения
const popupConfirm = document.querySelector(".popup_type_delete");
const formConfirm = document.querySelector(".popup__form_type_delete");

// Обьект формы
const formObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Конфигурация API
const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    "Content-Type": "application/json",
    authorization: "a4c45c7f-c893-4f18-9f88-b5a255df5416",
  },
};

// Экспорты
export {
  templateCard,
  inputValueJob,
  inputValueName,
  profileName,
  profileAdd,
  profileJob,
  formProfile,
  profileEditor,
  popupAdd,
  popupAddForm,
  apiConfig,
  popupConfirm,
  formConfirm,
};
