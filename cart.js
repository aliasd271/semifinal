let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
    renderCartItems();
    updateCartInfo();

    document.getElementById("myBtn").addEventListener("click", removeAllCart);
});

function renderCartItems() {
    const cartTableBody = document.getElementById("cartTableBody");
    cartTableBody.innerHTML = ''; // Clear previous items

    cart.forEach((product, index) => {
        cartTableBody.innerHTML += `
            <tr>
                <td><img src="${product.image}" alt="${product.title}" style="width: 50px;"></td>
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${(product.price * product.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                </td>
            </tr>
        `;
    });
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        quantity = 1;
    }

    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartInfo();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartInfo();
}

function removeAllCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartInfo();
}

function updateCartInfo() {
    let totalProducts = 0;
    let totalPrice = 0.00;

    cart.forEach(product => {
        totalProducts += product.quantity;
        totalPrice += product.price * product.quantity;
    });

    document.getElementById("totalProducts").innerText = totalProducts;
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);

    // Update badge number
    const badge = document.querySelector('#badge');
    if (badge) {
        badge.innerText = totalProducts;
       // badge.style.display = totalProducts > 0 ? 'inline' : 'none';
    }
}
