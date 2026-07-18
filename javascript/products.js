
const slides = document.querySelectorAll(".slide");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 1;

next.onclick = function () {

    slides[current].classList.remove("active");

    current++;

    if (current >= slides.length) {
        current = 0;
    }

    slides[current].classList.add("active");
};

prev.onclick = function () {

    slides[current].classList.remove("active");

    current--;

    if (current < 0) {
        current = slides.length - 1;
    }

    slides[current].classList.add("active");
};