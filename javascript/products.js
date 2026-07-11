
// Find all images with the "slide" class
const slides = document.querySelectorAll(".slide");

// Find the next and previous buttons
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

// Start by showing the first image (index 0)
let current = 0;

// When the NEXT button is clicked
next.onclick = function () {

    // Hide the current image
    slides[current].classList.remove("active");

    // Move to the next image
    current++;

    // If we've gone past the last image,
    // go back to the first one
    if (current >= slides.length) {
        current = 0;
    }

    // Show the new current image
    slides[current].classList.add("active");
};

// When the PREVIOUS button is clicked
prev.onclick = function () {

    // Hide the current image
    slides[current].classList.remove("active");

    // Move to the previous image
    current--;

    // If we've gone before the first image,
    // go to the last image
    if (current < 0) {
        current = slides.length - 1;
    }

    // Show the new current image
    slides[current].classList.add("active");
};