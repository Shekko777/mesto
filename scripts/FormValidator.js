export class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
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
  _activeButton = (buttonElement) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  };

  // Заблокировать кнопку
  _blockedButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  };

  // Проверить статус кнопки
  _setButtonStatus = (buttonElement, status) => {
    !status
      ? this._blockedButton(buttonElement)
      : this._activeButton(buttonElement);
  };

  // Проверить валидность кнопки
  _checkInputValidate = (inputElement, formElement) => {
    const inputValidStatus = inputElement.validity.valid;
    const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);

    !inputValidStatus
      ? this._showErrorMessage(inputElement, errorSpan)
      : this._hideErrorMessage(inputElement, errorSpan);
  };

  // Повесить обработчики событий
  _setEventListener = (formElement) => {
    const inputsList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const submitButtonForm = formElement.querySelector(
      this._submitButtonSelector
    );
    this._setButtonStatus(submitButtonForm, false);

    inputsList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidate(inputItem, formElement);
        this._setButtonStatus(submitButtonForm, formElement.checkValidity());
      });
    });
  };

  // Включить проверку формы
  enableValidation() {
    const formsList = Array.from(document.querySelectorAll(this._formSelector));
    formsList.forEach((formItem) => {
      this._setEventListener(formItem);
    });
  }
}
