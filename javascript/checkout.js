const params = new URLSearchParams(window.location.search);
const productId = params.get("product");
console.log("Product ID:", productId);

const products = {
    "vatrex-plainblackrss": {
        name: "VATREX plain black SS",
        price: 799,
        image: "../images/VSS.webp"
    },
    "vatrex-lighteningls": {
        name: "VATREX lightening LS shirt",
        price: 899,
        image: "../images/VLS.webp"
    },
    "vatrex-HOODIE": {
        name: "VATREX Hoodie",
        price: 1499,
        image: "../images/VH.webp"
    },
    "vatrex-beige-pants": {
        name: "VATREX Beige Pants",
        price: 999,
        image: "../images/VP.webp"
    },
    "vatrex-wb-plain-shirt": {
        name: "VATREX B&W Plain Shirt",
        price: 1299,
        image: "../images/frontwbshirt.webp"
    },
    "vatrex-black-pants": {
        name: "VATREX Plain black Pants",
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
         quantity:Number(document.getElementById("quantity").value),

        product: {
            id: productId,
            name: selectedProduct.name,
            price: selectedProduct.price,
        },
        }));

    window.location.href = "review.html";

});