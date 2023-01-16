"use strict";

class Menu {
  menu = document.querySelector(".nav-hum-berger");
  nav = document.querySelector(".nav-links");
  navclose = document.querySelector(".nav-close");
  navItem = document.querySelector(".nav-item");
  header = document.querySelector(".header");
  constructor() {
    this.menu.addEventListener("click", this.showMenu.bind(this));
    this.navclose.addEventListener("click", this.removeMenu.bind(this));
    this.nav.addEventListener("click", this.removeMenuOnLinkClick.bind(this));
  }
  showMenu() {
    this.nav.classList.add("nav-links--active");
  }
  removeMenu() {
    this.nav.classList.remove("nav-links--active");
  }
  removeMenuOnLinkClick(e) {
    if (e.target.closest(".nav-item")) {
      this.nav.classList.remove("nav-links--active");
    }
  }
}

const menu = new Menu();

export { Menu };
