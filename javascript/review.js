const data = JSON.parse(sessionStorage.getItem("checkout"));

if (!data) {
    alert("No checkout information found.");
    window.location.href = "checkout.html";
}

// Shipping prices
const shippingPrices = {
    "Cairo": 60,
    "Giza": 60,
    "Alexandria": 70,
    "Qalyubia": 70,
    "Sharqia": 80,
    "Dakahlia": 80,
    "Beheira": 90,
    "Monufia": 80,
    "Gharbia": 80,
    "Kafr El Sheikh": 90,
    "Domyat": 90,
    "Port Said": 100,
    "Ismailia": 90,
    "Suez": 90,
    "Faiyum": 80,
    "Beni Suef": 90,
    "Minya": 100,
    "Assiut": 110,
    "Sohag": 120,
    "Qena": 130,
    "Luxor": 140,
    "Aswan": 150,
    "Red Sea": 150,
    "el wadi el gdid": 160,
    "Matrouh": 150,
    "North Sinai": 160,
    "South Sinai": 170
};

// Product images
const productImages = {
    "vatrex-ss": "../images/VSS.webp",
    "vatrex-ls": "../images/VLS.webp",
    "vatrex-HOODIE": "../images/VH.webp",
    "vatrex-v-LASTLY-pants": "../images/VP.webp",
    "vatrex-mixed-shoulderss": "../images/Vshirtblack.webp",
    "vatrex-shadow-pants": "../images/redpants.webp"
};

const shipping = shippingPrices[data.governorate] || 0;
const total = data.product.price + shipping;

// Product
document.getElementById("product-image").src = productImages[data.product.id];
document.getElementById("product-name").textContent = data.product.name;
document.getElementById("product-price").textContent = `${data.product.price} EGP`;

// Customer
document.getElementById("customer-name").textContent = data.fullname;
document.getElementById("customer-email").textContent = data.email;
document.getElementById("customer-phone").textContent = data.phone;
document.getElementById("customer-governorate").textContent = data.governorate;
document.getElementById("customer-city").textContent = data.city;
document.getElementById("customer-street").textContent = data.street;
document.getElementById("customer-apartment").textContent = data.apartment;
document.getElementById("customer-postal").textContent =
    data.postal || "N/A";

// Summary
document.getElementById("summary-product-price").textContent =
    `${data.product.price} EGP`;

document.getElementById("summary-shipping").textContent =
    `${shipping} EGP`;

document.getElementById("summary-total").textContent =
    `${total} EGP`;

// Back button
document.getElementById("back-button").addEventListener("click", () => {
    history.back();
});

// Confirm Order
document.getElementById("confirm-button").addEventListener("click", async () => {

    const button = document.getElementById("confirm-button");

    button.disabled = true;
    button.textContent = "Processing...";

    let response;

    try {

        response = await fetch("https://vatrex-production.up.railway.app/checkout", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                ...data,

                shippingPrice: shipping,
                totalPrice: total

            })

        });

    } catch (err) {

        console.error(err);

        alert("Could not connect to server.");

        button.disabled = false;
        button.textContent = "Confirm Order";

        return;

    }

    let result;

    try {

        result = await response.json();

    } catch (err) {

        console.error(err);

        alert("Invalid server response. please check the form you entered if the number is correct, or check your e-mail if it has the @");

        button.disabled = false;
        button.textContent = "Confirm Order";

        return;

    }

    if (response.ok) {

        alert(result.message);

        sessionStorage.removeItem("checkout");

        window.location.href = "../index.html";

    } else {

        alert(result.message || "Something went wrong.");

        button.disabled = false;
        button.textContent = "Confirm Order";

    }

});