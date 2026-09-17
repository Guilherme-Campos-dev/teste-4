// script.js

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const tabs = document.querySelectorAll(".tab");
const foodCards = document.querySelectorAll(".food-card");
const addButtons = document.querySelectorAll(".add-button");
const cartToast = document.getElementById("cartToast");
const toastProduct = document.getElementById("toastProduct");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 35);
});

menuButton.addEventListener("click", () => {
  menu.classList.toggle("open");

  const isOpen = menu.classList.contains("open");
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedCategory = tab.dataset.category;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    foodCards.forEach((card) => {
      const shouldShow = card.dataset.type === selectedCategory;

      card.classList.toggle("hidden-card", !shouldShow);

      if (shouldShow) {
        card.classList.remove("visible");
        setTimeout(() => card.classList.add("visible"), 40);
      }
    });
  });
});

let toastTimeout;

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toastProduct.textContent = button.dataset.product;
    cartToast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      cartToast.classList.remove("show");
    }, 3000);
  });
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => observer.observe(element));