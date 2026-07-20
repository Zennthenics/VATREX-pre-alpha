const params = new URLSearchParams(window.location.search);
const productId = params.get("product");


console.log(productId);
const products = {
    "vatrex-ss": {
        name: "VATREX SS",
        price: 799,
        image: "../images/vatrex-ss.webp"
    },

    "vatrex-ls": {
        name: "VATREX LS",
        price: 899,
        image: "../images/vatrex-ls.webp"
    },

    "vatrex-hoodie": {
        name: "VATREX Hoodie",
        price: 1499,
        image: "../images/hoodie.webp"
    },

    "vatrex-pants": {
        name: "VATREX Pants",
        price: 999,
        image: "../images/pants.webp"
    }
}
const selectedProduct = products[productId];
