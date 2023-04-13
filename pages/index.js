// Поставить лайк
let likeBtn = document.querySelectorAll(".elements__like");

for (like of likeBtn) {
  let itemElem = like.closest(".elements__item");
  let likeBtn = itemElem.querySelector(".elements__like");

  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("elements__like_active");
  });
}

// Изменение профиля
