"use strict";
import { Menu } from "./menuScript.js";

const fqa = document.querySelector(".fqa");
const items = document.querySelectorAll(".fqa-item");

let previous;

fqa.addEventListener("click", function (e) {
  if (e.target.closest(".fqa-item")) {
    console.log("0k");
    if (e.target.closest(".fqa-item").classList.contains("shown")) {
      e.target.closest(".fqa-item").classList.remove("shown");
    } else {
      previous?.classList.remove("shown");
      previous = e.target.closest(".fqa-item");
      previous.classList.add("shown");
    }
  }
});

const menu = new Menu();
