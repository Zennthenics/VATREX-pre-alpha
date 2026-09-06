const params = new URLSearchParams(window.location.search);
const productId = params.get("product");
console.log("Product ID:", productId);

const products = {
    "vatrex-plainblackrss": {
        name: "VATREX plain black SS",
        price: 400,
        image: "../images/VSS.webp"
    },
    "vatrex-lighteningls": {
        name: "VATREX lightening LS shirt",
        price: "not priced yet",
        image: "../images/VLS.webp"
    },
    "vatrex-HOODIE": {
        name: "VATREX Hoodie",
        price: "not priced yet",
        image: "../images/VH.webp"
    },
    "vatrex-grey-pants": {
        name: "VATREX grey Pants",
        price: "not priced yet",
        image: "../images/VGP.webp"
    },
    "vatrex-wb-plain-shirt": {
        name: "VATREX B&W Plain Shirt",
        price: 400,
        image: "../images/frontwbshirt.webp"
    },
    "vatrex-black-pants": {
        name: "VATREX Plain black Pants",
        price: "not priced yet",
        image: "../images/redpants.webp"
    },
    "vatrex-white-pants": {
        name: "VATREX White Pants",
        price: "not priced yet",
        image: "../images/vwp.webp"
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
         quantity:Number(document.getElementById("quantity").value),

        product: {
            id: productId,
            name: selectedProduct.name,
            price: selectedProduct.price,
        },
        }));

    window.location.href = "review.html";

});