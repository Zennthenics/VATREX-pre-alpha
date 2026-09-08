```javascript
document.addEventListener("DOMContentLoaded", () => {

    const buyButton = document.getElementById("buy-button");

    if (!buyButton) return;

    buyButton.addEventListener("click", () => {

        const product = {
            id: "raptor-black-bag",
            name: "RAPTOR Black Heavy Bag",
            price: 1350,
            image: "../images/psraptorbag.webp",
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the bag is already in the cart
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Send the customer to the cart
        window.location.href = "../cart.html";
    });

});
```

```html
<button id="buy-button" class="buy" data-product="raptor-black-bag">
    buy now
</button>
```



```javascript
{
    id: "raptor-black-bag",
    name: "RAPTOR Black Heavy Bag",
    price: 1350,
    image: "../images/psraptorbag.webp",
    quantity: 1
}
```
