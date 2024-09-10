document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Product 1", price: 10, quantity: 1 },
        { id: 2, name: "Product 2", price: 20, quantity: 1 },
        { id: 3, name: "Product 3", price: 30, quantity: 1 },
    ];

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productList = document.getElementById("product-list");
    const cartList = document
        .getElementById("cart-items")
        .getElementsByTagName("tbody")[0];
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotal = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    const clearCartBtn = document.querySelector("th button"); // Target "Remove All Product" button

    // Show products
    products.forEach((item) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product");
        productItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    // Add to Cart
    productList.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const productItem = products.find((item) => item.id === productId);
            addToCart(productItem);
        }
    });

    function addToCart(productItem) {
        const existingIndex = cart.findIndex(
            (item) => item.id === productItem.id
        );
        if (existingIndex > -1) {
            cart[existingIndex].quantity++;
        } else {
            cart.push({ ...productItem });
        }
        saveCart();
        displayCart();
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        totalPrice.innerText = `$${total.toFixed(2)}`;
    }

    function displayCart() {
        // Clear old rows
        cartList.innerHTML = "";

        if (cart.length === 0) {
            document.getElementById("cart-items").classList.add("hidden");
            cartTotal.classList.add("hidden");
            emptyCartMsg.classList.remove("hidden");
        } else {
            document.getElementById("cart-items").classList.remove("hidden");
            cartTotal.classList.remove("hidden");
            emptyCartMsg.classList.add("hidden");

            cart.forEach((item) => {
                const row = cartList.insertRow();
                row.insertCell().innerText = item.name;
                row.insertCell().innerText = item.quantity;
                row.insertCell().innerText = `$${(
                    item.price * item.quantity
                ).toFixed(2)}`;

                const removeCell = row.insertCell();
                const removeButton = document.createElement("button");
                removeButton.innerText = "Remove";
                removeButton.classList.add("remove-button");

                removeButton.addEventListener("click", () => {
                    const index = cart.findIndex((i) => i.id === item.id);
                    if (index !== -1) {
                        item.quantity--;
                        if (item.quantity < 1) cart.splice(index, 1);
                        saveCart();
                        displayCart();
                    }
                });

                removeCell.appendChild(removeButton);
            });
        }

        updateTotal();
    }

    // Remove all items
    clearCartBtn.addEventListener("click", () => {
        cart.length = 0;
        saveCart();
        displayCart();
    });

    // Checkout
    checkoutBtn.addEventListener("click", () => {
        alert(
            `Checkout successful for ${cart.length} item(s). Total: ${totalPrice.innerText}`
        );
        cart.length = 0;
        saveCart();
        displayCart();
    });

    // Show cart on load
    displayCart();
});
