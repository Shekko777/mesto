let popup = document.querySelector(".popup"); //Сам popup
let likeButtons = document.querySelectorAll(".elements__like"); //Сердечки на карточках
let formInputs = document.querySelectorAll(".popup__input"); //Инпуты формы
let formSaveSubmit = document.querySelector(".popup__save-btn"); //Кнопка сохранения формы
let profileName = document.querySelector(".profile__title"); //Имя в профиле
let profileJob = document.querySelector(".profile__subtitle"); //Профессия в профиле
let profileEditor = document.querySelector(".profile__edit-btn"); //Кнопка изменения профиля
let images = document.querySelectorAll(".elements__img"); //Картинки

// Автозаполнение alt у картинок
function handleAltImages() {
  images.forEach((el) => {
    let imagesItem = el.closest(".elements__item");
    let imagesTitle = imagesItem.querySelector(".elements__title");
    el.setAttribute("alt", imagesTitle.textContent);
  });
}
handleAltImages();

// Поставить лайк
likeButtons.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("elements__like_active");
  });
});

// Функция изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  let inputValueName = formInputs[0].value.length;
  let inputValueJob = formInputs[1].value.length;

  // Проверка на колличество символом. Ради тест-эксперимента :)
  // "Горячий-шоколад" бери, дальше без него никак (─‿‿─)
  if (inputValueName <= 3 || inputValueJob <= 3) {
    console.log("Маленькое значение, введите больше");
  } else if (inputValueName >= 40 || inputValueJob >= 40) {
    console.log("Чет как-то много написано :/");
  } else {
    profileName.textContent = formInputs[0].value;
    profileJob.textContent = formInputs[1].value;
    popup.classList.remove("popup_opened"); //Закроет редактирование при сохранении
  }
}

formSaveSubmit.addEventListener("click", handleFormSubmit);

// Открытие и закрытие профиля
profileEditor.addEventListener("click", () => {
  let profileEditorClose = document.querySelector(".popup__close");
  popup.classList.add("popup_opened");

  formInputs[0].value = profileName.textContent;
  formInputs[1].value = profileJob.textContent;

  // Закрытие редактирования профиля
  profileEditorClose.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });
  // Закрытие редактирования при нажатии ESC
  document.addEventListener("keydown", (evt) => {
    let key = evt.key;
    if (key === "Escape" && popup.classList.contains("popup_opened")) {
      popup.classList.remove("popup_opened");
      console.log("esc");
    }
  });
});
