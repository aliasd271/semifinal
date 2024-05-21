// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch the product details from the API

//     function viewProduct(id) {
//         localStorage.setItem("productId", id); // Store the product ID in local storage
//         window.location.href = "product.html"; // Navigate to the single product page
//     }
    

//     const productID = JSON.parse(localStorage.getItem("productDetails"));
//     const productId =3; // Replace with the actual product ID
//     fetch(`https://products-api-delta.vercel.app/api/product/${productId}`)
//         .then(response => response.json())
//         .then(product => {
//             // Store product details in local storage
//             localStorage.setItem("productDetails", JSON.stringify(product));

//             // Display product details on the page
//             document.getElementById("productDetails").innerHTML = `
//                 <div class="col-md-6">
//                     <img src="${product.image}" class="img-fluid" alt="${product.title}">
//                 </div>
//                 <div class="col-md-6">
//                     <h1 class="product-title">${product.title}</h1>
//                     <h2 class="product-price">$${product.price}</h2>
//                     <p class="product-description">${product.description}</p>
//                     <div class="d-grid gap-2 d-md-block">
//                         <button class="btn btn-primary w-40 g-5" onclick="addToWishlist()">Add to Wishlist</button>
//                         <button class="btn btn-success w-40 g-5" onclick="addToCart()">Add to Cart</button>
//                     </div>
//                     <div class="row bg-light mt-5">
//                         <!-- Additional product details here -->
//                     </div>
//                 </div>
//             `;
//         })
//         .catch(error => {
//             console.error('Error fetching product:', error);
//             // Handle error appropriately
//         });
// });

// // Define button click handler to add product to wishlist
// function addToWishlist() {
//     const product = JSON.parse(localStorage.getItem("productDetails"));
//     // Your logic to add product to wishlist
// }

// // Define button click handler to add product to cart
// function addToCart() {
//     const product = JSON.parse(localStorage.getItem("productDetails"));
//     // Your logic to add product to cart
// }

// // Function to handle navigation back
// function goBack() {
//     window.history.back();
// }




// function goBack() {
//     window.history.back();
// }
document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("productId"); // Get product ID from local storage

    if (productId) {
        fetch(`https://products-api-delta.vercel.app/api/product/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById("productDetails").innerHTML = `
                    <div class="col-md-6">
                        <img src="${product.image}" class="img-fluid" alt="${product.title}">
                    </div>
                    <div class="col-md-6">
                        <h1 class="product-title">${product.title}</h1>
                        <h2 class="product-price">$${product.price}</h2>
                        <p class="product-description">${product.description}</p>
                        <div class="d-grid gap-2 d-md-block">
                            <button class="btn btn-primary w-40 g-5" onclick="addToWishlist()">Add to Wishlist</button>
                            <button class="btn btn-success w-40 g-5" onclick="addToCart()">Add to Cart</button>
                        </div>
                        <div class="row bg-light mt-5">
                            <div class="row col d-flex align-items-center">
                                <div class="col col-lg-6">
                                    <img src="./image/car.png" style="font-size: 2rem; height: 50px;" alt="Free Delivery">
                                </div>
                                <div class="col col-lg-6">
                                    <p>Free Delivery</p>
                                    <p>1-2 days</p>
                                </div>
                            </div>
                            <div class="row col d-flex align-items-center">
                                <div class="col col-lg-6">
                                    <img src="./image/grante.png" style="font-size: 2rem; height: 50px;" alt="In Stock">
                                </div>
                                <div class="col col-lg-6">
                                    <p>In Stock</p>
                                    <p>Today</p>
                                </div>
                            </div>
                            <div class="row col d-flex align-items-center">
                                <div class="col col-lg-6">
                                    <img src="./image/home.png" style="height: 50px;" alt="Guaranteed">
                                </div>
                                <div class="col col-lg-6">
                                    <p>Guaranteed</p>
                                    <p>1 year</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                document.getElementById("productDetails").innerHTML = `
                    <div class="col-12">
                        <h2>Product not found</h2>
                        <p>The product you are looking for is not available.</p>
                    </div>
                `;
            });
    } else {
        document.getElementById("productDetails").innerHTML = `
            <div class="col-12">
                <h2>Product not found</h2>
                <p>The product you are looking for is not available.</p>
            </div>
        `;
    }
});

function addToWishlist() {
    const product = JSON.parse(localStorage.getItem("productDetails"));
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Product added to wishlist!");
    } else {
        alert("Product is already in the wishlist.");
    }
}

function addToCart() {
    const product = JSON.parse(localStorage.getItem("productDetails"));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const obj = cart.find((ele) => ele.id === product.id);
    if (obj === undefined) {
        cart.push({ ...product, quantity: 1 });
    } else {
        obj.quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}

function goBack() {
    window.history.back();
}


