// Поставить лайк
const likeButtons = document.querySelectorAll(".elements__like");

likeButtons.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("elements__like_active");
  });
});
