"use strict";
import { Menu } from "./menuScript.js";
const inputEmail = document.querySelector(".form-input--email");
const inputPassword = document.querySelector(".form-input--password");
const passwordValidation = document.querySelector(".form-Validation-password");
const emailValidation = document.querySelector(".form-Validation-email");
const btnSignIn = document.querySelector(".btn--signin");

class App {
  constructor() {
    btnSignIn.addEventListener("click", this.signIn.bind(this));
  }
  signIn(e) {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    emailValidation.textContent = passwordValidation.textContent = "";
    if (email === "") {
      emailValidation.textContent = "this field is required";
      return;
    }
    if (password === "") {
      passwordValidation.textContent = "this field is required";
      return;
    }

    location = "./app.html";

    inputEmail.value = inputPassword.value = "";
  }
}
const app = new App();
const menu = new Menu();
