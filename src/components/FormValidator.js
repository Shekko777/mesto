class FormValidator {
  constructor(config, formElement) {
    // параметры
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._button = formElement.querySelector(`${config.submitButtonSelector}`);
    this._inputList = formElement.querySelectorAll(`${config.inputSelector}`);

    // форма
    this._formElement = formElement;
  }

  // Показать ошибку
  _showErrorMessage = (inputElement, errorSpan) => {
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  // Скрыть ошибку
  _hideErrorMessage = (inputElement, errorSpan) => {
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  };

  // Включить кнопку
  _activeButton = () => {
    this._button.disabled = false;
    this._button.classList.remove(this._inactiveButtonClass);
  };

  // Заблокировать кнопку
  _blockedButton = () => {
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
  };

  // Проверить статус кнопки
  _setButtonStatus = (status) => {
    !status ? this._blockedButton() : this._activeButton();
  };

  // Проверить валидность кнопки
  _checkInputValidate = (inputElement) => {
    const inputValidStatus = inputElement.validity.valid;
    const errorSpan = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );

    !inputValidStatus
      ? this._showErrorMessage(inputElement, errorSpan)
      : this._hideErrorMessage(inputElement, errorSpan);
  };

  // Повесить обработчики событий
  _setEventListener = () => {
    this._setButtonStatus(false);
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidate(inputItem);
        this._setButtonStatus(this._formElement.checkValidity());
      });
    });
  };

  // Сбросить ошибки
  resetError() {
    this._inputList.forEach((inputElement) => {
      // сделал так потому, что если использовать метод _checkInputValidate, то при открытии он сразу показывает ошибки, что поля не заполнены :с
      const errorSpan = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      this._hideErrorMessage(inputElement, errorSpan);
      this._blockedButton();
    });
  }

  // Включить проверку формы
  enableValidation() {
    this._setEventListener();
  }
}
export default FormValidator;
