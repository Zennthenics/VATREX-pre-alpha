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


// SIZE SELECTION

const sizeButtons = document.querySelectorAll(".size-button");
const selectedSizeText = document.getElementById("selected-size");
const buyButton = document.getElementById("buy-button");

let selectedSize = null;

sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        sizeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedSize = button.dataset.size;

        if (selectedSizeText) {
            selectedSizeText.textContent =
                `Selected size: ${selectedSize}`;
        }

    });

});


// BUY BUTTON

buyButton.addEventListener("click", () => {

    if (!selectedSize) {
        alert("Please select a size.");
        return;
    }

    const productId = buyButton.dataset.product;

    if (!productId) {
        alert("Product ID is missing.");
        return;
    }

    window.location.href =
        `checkout.html?product=${productId}&size=${selectedSize}`;

});