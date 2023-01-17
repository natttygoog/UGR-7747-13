"use strict";
import { Menu } from "./menuScript.js";
const btnPlay = document.querySelector(".intro-video-play-btn");
const btnclose = document.querySelector(".intro-close");
const overlay = document.querySelector(".overlay");
const video = document.querySelector(".intro-video");
const btnAudioPlay = document.querySelector(".ceo-audio-caption");
const audio = document.querySelector(".ceo-audio");
const testimonialArr = [...document.querySelectorAll(".testimonial")];
const testimonialcontainer = document.querySelector(".testimonials");
const testimonialBtnleft = document.querySelector(".testimonial-btn-left");
const testimonialBtnRight = document.querySelector(".testimonial-btn-right");
const testimonialCircleArr = document.querySelectorAll(".circle-btn");
const testimonialCircleContainer = document.querySelector(".circle-btns");
const inputUsername = document.querySelector(".form-input--username");
const inputEmail = document.querySelector(".form-input--email");
const header = document.querySelector(".header");
const inputPassword = document.querySelector(".form-input--password");
const sectionHero = document.querySelector(".section-hero");
const inputConfirmPassword = document.querySelector(
  ".form-input--confirm-password"
);
const passwordValidation = document.querySelector(".form-Validation-password");
const ConfirmPasswordValidation = document.querySelector(
  ".form-Validation-confirm-password"
);
const nameValidation = document.querySelector(".form-Validation-name");
const emailValidation = document.querySelector(".form-Validation-email");
const btnCreateAccount = document.querySelector(".btn--create-account");

class App {
  audioPlay = false;
  counter = 1;
  width;
  circleNum = 0;
  filledCricle = testimonialCircleArr[this.circleNum];

  constructor() {
    btnPlay.addEventListener("click", this.playVideo);
    btnclose.addEventListener("click", this.pauseVideo);
    overlay.addEventListener("click", this.removeOverlay);
    btnAudioPlay.addEventListener("click", this.audioToggle.bind(this));
    this.getWidth();
    this.init();
    window.addEventListener("resize", this.getWidth.bind(this));
    window.addEventListener("resize", this.init.bind(this));
    this.btncolor();
    testimonialBtnleft.addEventListener("click", this.moveLeft.bind(this));
    testimonialBtnRight.addEventListener("click", this.moveRight.bind(this));
    testimonialCircleContainer.addEventListener(
      "click",
      this.cricleBtnMove.bind(this)
    );
    btnCreateAccount.addEventListener("click", this.createAccount.bind(this));
    this.stickyNav();
  }

  playVideo() {
    document.body.classList.add("video-active");
    video.play();
  }
  pauseVideo() {
    video.pause();
    document.body.classList.remove("video-active");
  }
  removeOverlay() {
    video.pause();
    document.body.classList.remove("video-active");
  }
  audioToggle() {
    if (!this.audioPlay) {
      audio.play();
      this.audioPlay = true;
      btnAudioPlay.style.backgroundColor = "var(--color-primary-light-3)";
    } else {
      audio.pause();
      btnAudioPlay.style.backgroundColor = "transparent";
      this.audioPlay = false;
    }
  }

  btncolor() {
    if (this.counter < 2) {
      testimonialBtnleft.classList.remove("active-btn");
    } else {
      testimonialBtnleft.classList.add("active-btn");
    }
    if (this.counter > testimonialArr.length - 2) {
      testimonialBtnRight.classList.remove("active-btn");
    } else {
      testimonialBtnRight.classList.add("active-btn");
    }
  }
  circleColor() {
    this.filledCricle.classList.remove("circle-btn--active");
    this.filledCricle = testimonialCircleArr[this.counter - 1];
    this.filledCricle.classList.add("circle-btn--active");
  }

  getWidth() {
    this.width = Number.parseFloat(
      getComputedStyle(testimonialCircleContainer).width
    );
    let a = 0.8 * this.width * 0.46;
    let b = 0.8 * this.width * 0.8;
    let c = b / a;
    if (this.width > 966) {
      this.width = 100 + 10 * c;
    } else {
      this.width = 100;
    }
  }

  init() {
    this.filledCricle.classList.remove("circle-btn--active");
    this.circleNum = 0;
    this.filledCricle = testimonialCircleArr[this.circleNum];
    testimonialArr.forEach((el, _, arr) => {
      el.style.transform = `translateX(${
        -(arr.length - 7) * this.width + this.width
      }%)`;
      this.counter = testimonialArr.length - 7;
      this.filledCricle.classList.add("circle-btn--active");
      this.btncolor();
    });
  }

  moveLeft() {
    this.getWidth();
    if (this.counter < 2) {
      return;
    }
    testimonialArr.forEach((el, i) => {
      el.style.transform = `translateX(${
        -(this.counter - 1) * this.width + this.width
      }%)`;
    });
    this.counter--;
    this.circleColor();
    this.btncolor();
  }
  moveRight() {
    this.getWidth();
    if (this.counter > testimonialArr.length - 2) {
      return;
    }
    testimonialArr.forEach((el, i) => {
      el.style.transform = `translateX(${-this.counter * this.width}%)`;
    });
    this.counter++;
    this.btncolor();
    this.circleColor();
  }
  cricleBtnMove(e) {
    const clicked = e.target;
    if (clicked.classList.contains("circle-btn")) {
      const num = clicked.dataset.num;
      this.counter = num;
      testimonialArr.forEach((el) => {
        el.style.transform = `translateX(${(1 - this.counter) * this.width}%)`;
      });
      this.filledCricle.classList.remove("circle-btn--active");
      this.filledCricle = clicked;
      this.filledCricle.classList.add("circle-btn--active");
      this.btncolor();
    }
  }

  createAccount(e) {
    e.preventDefault();
    const userName = inputUsername.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const ConfirmPassword = inputConfirmPassword.value;
    nameValidation.textContent =
      emailValidation.textContent =
      passwordValidation.textContent =
      ConfirmPasswordValidation.textContent =
        "";
    const validateEmail = (email) =>
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (userName === "") {
      nameValidation.textContent = "this field is required";
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
    if (password === "") {
      passwordValidation.textContent = "this field is required";
      return;
    }
    if (password.length < 8) {
      passwordValidation.textContent = " password show be 8 or more characters";
      return;
    }

    if (ConfirmPassword === "") {
      ConfirmPasswordValidation.textContent = "this field is required";
      return;
    }
    if (ConfirmPassword !== password) {
      ConfirmPasswordValidation.textContent = "the passwords do not match";
      return;
    }

    const popupText = document.createElement("div");
    popupText.classList.add("popup-text");
    popupText.innerHTML = `<p>You create an account successfully</p>
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
      document.body.classList.remove("create-success");
      popupText.remove();
    });
    overlay.addEventListener("click", () => {
      document.body.classList.remove("create-success");
      popupText.remove();
    });
    inputEmail.value =
      inputUsername.value =
      inputPassword.value =
      inputConfirmPassword.value =
        "";
  }

  stickyNav() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          header.classList.add("header--home");
        } else {
          header.classList.remove("header--home");
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(sectionHero);
  }
}
const menu = new Menu();
const app = new App();
