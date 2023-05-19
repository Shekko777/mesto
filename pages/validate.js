// Обьект формы
const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Появление смс
const showErrorMessage = (inputElement, errorSpan, config) => {
  errorSpan.classList.add(config.errorClass);
  errorSpan.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

// Удаление смс
const hideErrorMessage = (inputElement, errorSpan, config) => {
  errorSpan.classList.add(config.errorClass);
  errorSpan.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
};

// Включить кнопку отправки
const activeButton = (buttonElement, config) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
};

// Выключить кнопку отправки
const blockedButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

// Проверка включения кнопки
const setButtonStatus = (buttonElement, status, config) => {
  !status
    ? blockedButton(buttonElement, config)
    : activeButton(buttonElement, config);
};

// Проверка инпутов на валидность
const checkInputValidate = (inputElement, formElement, config) => {
  const inputValidStatus = inputElement.validity.valid;
  const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);

  !inputValidStatus
    ? showErrorMessage(inputElement, errorSpan, config)
    : hideErrorMessage(inputElement, errorSpan, config);
};

// Повесить обработчики событий на нужные элементы
const setEventListener = (formElement, config) => {
  const inputsList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  ); // Массив инпутов в форме
  const submitButtonForm = formElement.querySelector(
    config.submitButtonSelector
  ); // Кнопка в нужной форме

  setButtonStatus(submitButtonForm, false, config);

  inputsList.forEach((inputItem) => {
    inputItem.addEventListener("input", () => {
      checkInputValidate(inputItem, formElement, config);
      setButtonStatus(submitButtonForm, formElement.checkValidity(), config);
    });
  });
};

// Взять обьект формы и работать с ним
const handleEnableValidation = (config) => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  formsList.forEach((formItem) => {
    setEventListener(formItem, config);
  });
};

handleEnableValidation(enableValidation);
