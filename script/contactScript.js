"use strict";
import { Menu } from "./menuScript.js";
const inputEmail = document.querySelector(".form-input--email");
const inputFrist = document.querySelector(".form-input--firstName");
const inputLast = document.querySelector(".form-input--lastName");
const inputcomment = document.getElementById("comment");
const emailValidation = document.querySelector(".form-Validation-email");
const FirstValidation = document.querySelector(".form-Validation-first");
const lastValidation = document.querySelector(".form-Validation-last");
const commentValidation = document.querySelector(".form-Validation-comment");
const btnSubmit = document.querySelector(".btn--submit");
const overlay = document.querySelector(".overlay");
class App {
  constructor() {
    btnSubmit.addEventListener("click", this.submit.bind(this));
  }
  submit(e) {
    e.preventDefault();
    const email = inputEmail.value;
    const first = inputFrist.value;
    const last = inputLast.value;
    const comment = inputcomment.value;
    const validateEmail = (email) =>
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    emailValidation.textContent =
      FirstValidation.textContent =
      lastValidation.textContent =
      commentValidation.textContent =
        "";
    if (first === "") {
      FirstValidation.textContent = "this field is required";
      return;
    }
    if (last === "") {
      lastValidation.textContent = "this field is required";
      return;
    }
    if (email === "") {
      emailValidation.textContent = "this field is required";
      return;
    }
    if (!validateEmail(email)) {
      emailValidation.textContent = "invalid email";
      return;
    }
    if (comment === "") {
      commentValidation.textContent = "this field is required";
      return;
    }

    const popupText = document.createElement("div");
    popupText.classList.add("popup-text");
    popupText.innerHTML = `<p>Thanks for you comment </p>
      <a class="btn btn--border" href="./pages/signin.html"
      >Sing in</a
    >
      <button class="popup-close">
      <i class="fa-regular fa-circle-xmark"></i>
    </button>
      `;
    document.body.append(popupText);
    document.body.classList.add("create-success");

    document.querySelector(".popup-close").addEventListener("click", () => {
      console.log("ok");
      document.body.classList.remove("create-success");
      popupText.remove();
    });
    overlay.addEventListener("click", () => {
      document.body.classList.remove("create-success");
      popupText.remove();
    });

    inputFrist.value =
      inputLast.value =
      inputEmail.value =
      inputcomment.value =
        "";
  }
}
const app = new App();
const menu = new Menu();
