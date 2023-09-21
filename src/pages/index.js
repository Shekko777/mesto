// ИМПОРТЫ ПЕРЕМЕННЫХ
import "./index.css";
import {
  templateCard,
  inputValueJob,
  inputValueName,
  profileName,
  profileAdd,
  profileJob,
  profileEditor,
  formObject,
  formProfile,
  popupAddForm,
  apiConfig,
  userAvatar,
  formAvatar,
  userAvatarButton,
} from "../scripts/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupConfirm from "../components/ConfirmPopup";

// Подключение API
const api = new Api(apiConfig);

// Обьявление попапа с картинкой
const popupImage = new PopupWithImage({
  popupSelector: "popup-images",
});
popupImage.setEventListeners();

// Переменная для проверки айди пользователя.
let userId;

// Получение пользователя и карточек с сервера для работы с ними
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoList, cards]) => {
    userId = userInfoList._id; // Установка айди пользователя в переменную
    userAvatar.src = userInfoList.avatar;
    // Создание карточек из сервера
    const renderCards = new Section(
      {
        data: cards,
        renderer: (item) => {
          const cardElement = createNewCard(item, userId);
          renderCards.addItem(cardElement, true);
        },
      },
      ".elements__list"
    );
    renderCards.renderElements();

    // Установка данных пользователя
    newUserInfo.setUserInfo(userInfoList.name, userInfoList.about);
  })
  .catch((err) => console.log(`Ошибка получения данных: ${err}`));

// Функция создания карточек
function createNewCard(item, ownerMeId) {
  const cardItem = new Card(
    {
      ownerId: ownerMeId,
      handleCardClick: () => {
        popupImage.open(item.name, item.link);
      },
      handleButtonDeleteClick: (id) => {
        popupFormConfirm.open();
        popupFormConfirm.handleCallBackFunction(() => {
          popupFormConfirm.preloadAnimation(true, "Удаление...");
          api
            .deleteCard(id)
            .then(() => {
              cardItem.deleteCard();
            })
            .catch((err) => console.log(`Ошибка удаления карточки: ${err}`))
            .finally(() => {
              popupFormConfirm.close();
              popupFormConfirm.preloadAnimation(false, "");
            });
        });
      },
      handleLikeClick: (idCard) => {
        if (cardItem.checkedMyLike()) {
          api
            .unLikeCard(idCard)
            .then((dataCard) => {
              cardItem.handleClickLike(cardItem.checkedMyLike, dataCard);
              cardItem.setLikeIcon();
            })
            .catch((err) =>
              console.log(`Удалить лайк не получилось, ошибка: ${err}`)
            );
        } else {
          api
            .likeCard(idCard)
            .then((dataCard) => {
              cardItem.handleClickLike(cardItem.checkedMyLike, dataCard);
              cardItem.setLikeIcon();
            })
            .catch((err) =>
              console.log(`Поставить лайк не получилось, ошибка: ${err}`)
            );
        }
      },
    },
    item,
    templateCard
  );
  const newCard = cardItem.generateCard();
  return newCard;
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ:
// Редактирование профиля: Обьявление класса
const newUserInfo = new UserInfo({
  profileNameElement: profileName,
  profileJobElement: profileJob,
});

// Редактирование профиля: Открытие попапа
profileEditor.addEventListener("click", () => {
  const { name, job } = newUserInfo.getUserInfo();
  inputValueName.value = name;
  inputValueJob.value = job;
  formUserValidation.resetError();
  popupEditProfile.open();
});

// Редактирование профиля: Обьявление попапа
const popupEditProfile = new PopupWithForm({
  popupSelector: "popup_type_edit",
  submit: (data) => {
    popupEditProfile.preloadAnimation(true, "Сохранение...");
    api
      .setNewUserInfo(data.name, data.about)
      .catch((err) =>
        console.log(`Не удолось обновить инфо пользователя: ${err}`)
      )
      .finally(() => {
        popupEditProfile.close();
        popupEditProfile.preloadAnimation(false, "");
      });
    newUserInfo.setUserInfo(data.name, data.about);
  },
});
popupEditProfile.setEventListeners();

// ДОБАВЛЕНИЕ КАРТОЧКИ:
// Не помню что... но что-то важное
const createNewsCard = new Section(
  {
    data: [],
    renderer: () => {},
  },
  ".elements__list"
);

// Добавление карточки: Попап с добавлением карточки
const popupWithNewCard = new PopupWithForm({
  popupSelector: "popup_type_add",
  submit: (item) => {
    popupWithNewCard.preloadAnimation(true, "Сохранение...");
    api
      .addNewCard(item.link, item.name)
      .then((dataCard) => {
        const cardElement = createNewCard(dataCard, userId);
        createNewsCard.addItem(cardElement, false);
      })
      .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
      .finally(() => {
        popupWithNewCard.close();
        popupWithNewCard.preloadAnimation(false, "");
      });
  },
});
popupWithNewCard.setEventListeners();

// Добавление карточки: Открытие попа добавление карточки
profileAdd.addEventListener("click", () => {
  formAddNewCardValidation.resetError();
  popupAddForm.reset();
  popupWithNewCard.open();
});

// ВАЛИДАЦИЯ ФОРМ:
// Валидация форм: Проверка валидности формы информации юзера
const formUserValidation = new FormValidator(formObject, formProfile);
formUserValidation.enableValidation();

// Валидация форм: Проверка валидности добавления карточки
const formAddNewCardValidation = new FormValidator(formObject, popupAddForm);
formAddNewCardValidation.enableValidation();

// Валидация форм: Проверка формы аватара
const formNewAvatarValidation = new FormValidator(formObject, formAvatar);
formNewAvatarValidation.enableValidation();

// Попап подтверждения
const popupFormConfirm = new PopupConfirm({
  popupSelector: "popup_type_delete",
});
popupFormConfirm.setEventListeners();

// Попап смены аватара
const popupWithAvatar = new PopupWithForm({
  popupSelector: "popup_type_avatar",
  submit: (newAvatar) => {
    popupWithAvatar.preloadAnimation(true, "Обновление...");
    api
      .setNewAvatar(newAvatar.avatar)
      .then((avatar) => {
        userAvatar.src = avatar.avatar;
      })
      .catch((err) => console.log(`Oops: ${err}`))
      .finally(() => {
        popupWithAvatar.close();
        popupWithAvatar.preloadAnimation(false, "");
      });
  },
});
popupWithAvatar.setEventListeners();

userAvatarButton.addEventListener("click", () => {
  popupWithAvatar.open();
});
