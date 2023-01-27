"use strict";
// import { Menu } from "./menuScript.js";
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

class App {
  audioPlay = false;
  counter = 1;
  width;
  circleNum = 0;
  filledCricle = testimonialCircleArr[this.circleNum];

  constructor() {
    btnPlay.addEventListener("click", this.playVideo);
    btnclose.addEventListener("click", this.pauseVideo);
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
    // btnCreateAccount.addEventListener("click", this.createAccount.bind(this));
    // this.stickyNav();
  }

  playVideo() {
    video.play();
  }
  pauseVideo() {
    video.pause();
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
    if (this.width > 1100) {
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
// const menu = new Menu();
const app = new App();
