// COFFEE PRODUCTS

const products = [
    {
        id: 1,
        name: "Cappuccino",
        price: 160,
        category: "Hot",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=85",
        description: "Rich espresso with creamy milk foam."
    },
    {
        id: 2,
        name: "Latte",
        price: 180,
        category: "Hot",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=85",
        description: "Smooth coffee with steamed milk."
    },
    {
        id: 3,
        name: "Americano",
        price: 140,
        category: "Hot",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=85",
        description: "Strong and classic black coffee."
    },
    {
        id: 4,
        name: "Iced Coffee",
        price: 190,
        category: "Cold",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=85",
        description: "Refreshing chilled coffee."
    },
    {
        id: 5,
        name: "Mocha",
        price: 210,
        category: "Special",
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=85",
        description: "Delicious chocolate coffee."
    },
    {
        id: 6,
        name: "Espresso",
        price: 120,
        category: "Hot",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=85",
        description: "Pure and strong espresso."
    },
    {
        id: 7,
        name: "Cold Brew",
        price: 220,
        category: "Cold",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=85",
        description: "Slow brewed and chilled coffee."
    },
    {
        id: 8,
        name: "Caramel Coffee",
        price: 230,
        category: "Special",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=85",
        description: "Coffee with sweet caramel flavour."
    }
];

let cart = [];


// DISPLAY PRODUCTS

function displayProducts() {

    const productList = document.getElementById("productList");

    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("categoryFilter").value;

    const filtered = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(search);

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    productList.innerHTML = "";

    filtered.forEach(product => {

        productList.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <span class="price">₹${product.price}</span>

            <button onclick="addToCart(${product.id})">
                Add To Cart +
            </button>

        </div>

        `;
    });

    if (filtered.length === 0) {
        productList.innerHTML = "<p>No coffee products found.</p>";
    }
}

displayProducts();


// SEARCH AND CATEGORY FILTER

document.getElementById("searchInput")
    .addEventListener("input", displayProducts);

document.getElementById("categoryFilter")
    .addEventListener("change", displayProducts);


// ADD TO CART

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>
                <b>${item.name}</b>

                <small>₹${item.price}</small>

                <small>Quantity: ${item.quantity}</small>
            </div>

            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button onclick="removeItem(${item.id})">Remove</button>
            </div>

        </div>

        `;
    });

    document.getElementById("totalPrice").innerText = total;

    document.getElementById("cartCount").innerText = count;
}


// CHANGE QUANTITY

function changeQuantity(id, amount) {

    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}


// REMOVE PRODUCT

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}


// OPEN AND CLOSE CART

function openCart() {

    document.getElementById("cartOverlay").style.display = "flex";
}

function closeCart() {

    document.getElementById("cartOverlay").style.display = "none";
}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Demo order placed successfully!");

    cart = [];

    updateCart();

    closeCart();
}


// MOBILE NAVIGATION

function toggleMenu() {

    document.getElementById("navbar").classList.toggle("show");
}


// LOGIN AND REGISTRATION

function openAccount() {

    document.getElementById("accountOverlay").style.display = "flex";
}

function closeAccount() {

    document.getElementById("accountOverlay").style.display = "none";
}

function showLogin() {

    document.getElementById("loginForm").style.display = "block";

    document.getElementById("registerForm").style.display = "none";

    document.getElementById("accountStatus").innerText = "";
}

function showRegister() {

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("registerForm").style.display = "block";

    document.getElementById("accountStatus").innerText = "";
}


// DEMO REGISTRATION

document.getElementById("registerForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const password = document.getElementById("registerPassword").value;

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        const users = JSON.parse(
            localStorage.getItem("brewUsers") || "[]"
        );

        if (users.some(user => user.email === email)) {
            alert("This email is already registered.");
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("brewUsers", JSON.stringify(users));

        document.getElementById("accountStatus").innerText =
            "Registration successful! Please login.";

        this.reset();

        showLogin();
    });


// DEMO LOGIN

document.getElementById("loginForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(
            localStorage.getItem("brewUsers") || "[]"
        );

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (user) {

            document.getElementById("accountStatus").innerText =
                "Welcome back, " + user.name + "!";

        } else {

            document.getElementById("accountStatus").innerText =
                "Invalid email or password.";

        }

    });


// CONTACT FORM

document.getElementById("contactForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {

            alert("Please fill in all fields.");

            return;
        }

        document.getElementById("contactStatus").innerText =
            "Thank you! Your message has been received in this demo.";

        this.reset();

    });