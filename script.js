const productsContainer = document.querySelector(".cards");
let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const searchInput = document.querySelector(".form-control");

getAllProducts();

function getAllProducts() {
    fetch("https://products-api-delta.vercel.app/api/products")
    .then((res) => res.json())
    .then((data) => {
        products = data;
        renderProducts(products);
    });
}

function toggleCart(index) {
    const product = products[index];
    const inCartIndex = cart.findIndex(item => item.id === product.id);

    if (inCartIndex > -1) {
        // Remove from cart
        cart.splice(inCartIndex, 1);
    } else {
        // Add to cart
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toggleCartButton(index);
    updateCartInfo();
}

function toggleCartButton(index) {
    const product = products[index];
    const inCart = cart.some(item => item.id === product.id);
    const button = document.querySelector(`.card[data-index="${index}"] .toggle-cart-btn`);
    
    if (button) {
        button.textContent = inCart ? 'Remove from Cart' : 'Add To Cart';
        button.classList.toggle('btn-danger', inCart);
        button.classList.toggle('btn-primary', !inCart);
    }
}

function updateCartInfo() {
    let totalProducts = 0;
    let totalPrice = 0.00;
    
    cart.forEach(product => {
        totalProducts += product.quantity;
        totalPrice += product.price * product.quantity;
    });

    document.querySelector('.bcount').innerText = totalProducts;
    document.querySelector('.bprice').innerText = totalPrice.toFixed(2);
}

function renderProducts(products) {
    productsContainer.innerHTML = ''; // Clear previous products
    products.forEach((product, index) => {
        productsContainer.innerHTML += `
            <div class="g-3 hcard col-sm-12 col-md-6 col-lg-3">
                <div class="card" style="width: 17rem;" data-index="${index}">
                    <div class="img-container">
                        <img src="${product.image}" class="card-img-top img-card" alt="${product.title}">
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${product.title}</h6>
                        <h5>${product.price} $</h5>
                        <p class="card-text">${product.description}</p>
                        <button onclick="toggleCart(${index})" class="w-100 btn btn-lg toggle-cart-btn ${cart.some(item => item.id === product.id) ? 'btn-danger' : 'btn-primary'}">
                            ${cart.some(item => item.id === product.id) ? 'Remove from Cart' : 'Add To Cart'}
                        </button>
                        <button onclick="viewProduct(${index})" class="w-100 btn btn-lg btn-secondary mt-2">Read More</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Function to filter products based on search query
function filterProducts(query) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
}

// Event listener for search input
searchInput.addEventListener('input', (event) => {
    filterProducts(event.target.value);
});

// Initial rendering of cart info and products
updateCartInfo();

function productDetails() {
    fetch("https://products-api-delta.vercel.app/api/product/:id")
    .then((res) => res.json())
    .then((data) => {
        productDetails = data;
        renderProducts(products);
    });
}

// //Function to handle "Read More" button click
// function viewProduct(id) {
//     localStorage.setItem("selectedProduct", JSON.stringify(products.find(product => product.id === id)));
//     window.location.href = "product.html"; // Navigate to single product page
// }


function viewProduct(id) {
    console.log("View Product called with ID:", id);
    const product = products.find(product => product.id === id);
    console.log("Product found:", product);
    if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "singleProduct.html"; // Navigate to single product page
    } else {
        console.error("Product not found!");
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    console.log("Selected Product:", selectedProduct);
    // Use the retrieved product data as needed
});


