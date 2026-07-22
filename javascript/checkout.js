const params = new URLSearchParams(window.location.search);
const productId = params.get("product");
console.log("Product ID:", productId);

const products = {
    "vatrex-ss": {
        name: "VATREX SS",
        price: 799,
        image: "../images/VSS.webp"
    },
    "vatrex-ls": {
        name: "VATREX LS",
        price: 899,
        image: "../images/VLS.webp"
    },
    "vatrex-HOODIE": {
        name: "VATREX Hoodie",
        price: 1499,
        image: "../images/VH.webp"
    },
    "vatrex-v-LASTLY-pants": {
        name: "VATREX LASTLY Pants",
        price: 999,
        image: "../images/VP.webp"
    },
    "vatrex-mixed-shoulderss": {
        name: "VATREX Mixed Shoulderss",
        price: 1299,
        image: "../images/blacksho.webp"
    },
    "vatrex-shadow-pants": {
        name: "VATREX Shadow Pants",
        price: 1099,
        image: "../images/redpants.webp"
    }
};

const selectedProduct = products[productId];
if (!selectedProduct) {
    alert("Invalid product.");
    window.location.href = "../index.html";
    throw new Error("Invalid product");
}

document.getElementById("checkoutForm").addEventListener("submit", (e) => {

    e.preventDefault();

    sessionStorage.setItem("checkout", JSON.stringify({
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        governorate: document.getElementById("governorate").value,
        city: document.getElementById("city").value,
        street: document.getElementById("street").value,
        apartment: document.getElementById("apartment").value,
        postal: document.getElementById("postal").value,
        product: {
            id: productId,
            name: selectedProduct.name,
            price: selectedProduct.price
        }
    }));

    window.location.href = "review.html";

});