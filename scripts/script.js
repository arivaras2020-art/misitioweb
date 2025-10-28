const menuBtn = document.getElementById("menu-btn");
const closeMenu = document.getElementById("close-menu");
const sideMenu = document.getElementById("side-menu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});