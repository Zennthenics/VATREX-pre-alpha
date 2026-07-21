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
    "vatrex-hoodie": {
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

document.getElementById("checkoutForm").addEventListener("submit", async (e) => {

    e.preventDefault();
    const submitButton = e.target.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";

let response;

try {
    response = await fetch("https://vatrex-production.up.railway.app/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
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
        })
    });
} catch (err) {
    console.error(err);
    alert("Could not connect to server.");
    submitButton.disabled = false;
    submitButton.textContent = "Submit Order";
    return;
}
let result;

try {
    result = await response.json();
} catch (err) {
    console.error(err);
    alert("Invalid server response.");
    submitButton.disabled = false;
    submitButton.textContent = "Submit Order";
    return;
}

if (response.ok) {
    alert(result.message);
    e.target.reset();
    console.log(result);

    submitButton.disabled = false;
    submitButton.textContent = "Submit Order";
} else {
    alert(result.message || "Something went wrong.");
    console.error(result);
}
submitButton.disabled = false;
submitButton.textContent = "Submit Order";});
