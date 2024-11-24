// Animations
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  // Animate hamburger icon
  const paths = menuBtn.querySelector("svg").querySelectorAll("path");
  paths.forEach((path) => {
    path.classList.toggle("translate-y-1");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});
