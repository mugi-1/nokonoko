const menuBtn = document.querySelector(".js-hamburger-button");
const menu = document.querySelector(".js-menu-nav");
const header = document.querySelector(".js-header");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("is-open");
});

menu.addEventListener("click", () => {
  header.classList.remove("is-open");
});
