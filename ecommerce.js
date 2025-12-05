// E-Commerce JavaScript

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    category: "electronics",
    icon: "🎧",
    badge: "New",
    description: "Premium noise-canceling headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    category: "electronics",
    icon: "⌚",
    badge: "Hot",
    description: "Feature-packed smartwatch",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    category: "accessories",
    icon: "💻",
    badge: "",
    description: "Ergonomic aluminum stand",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    category: "electronics",
    icon: "⌨️",
    badge: "Sale",
    description: "RGB backlit gaming keyboard",
  },
  {
    id: 5,
    name: "Phone Case",
    price: 24.99,
    category: "accessories",
    icon: "📱",
    badge: "",
    description: "Protective silicone case",
  },
  {
    id: 6,
    name: "Premium Software Suite",
    price: 199.99,
    category: "software",
    icon: "💾",
    badge: "New",
    description: "Complete productivity suite",
  },
  {
    id: 7,
    name: "Webcam HD",
    price: 89.99,
    category: "electronics",
    icon: "📷",
    badge: "",
    description: "1080p streaming webcam",
  },
  {
    id: 8,
    name: "Mouse Pad",
    price: 19.99,
    category: "accessories",
    icon: "🖱️",
    badge: "",
    description: "Extra large gaming pad",
  },
];

let cart = [];
let currentFilter = "all";

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered =
    currentFilter === "all"
      ? products
      : products.filter((p) => p.category === currentFilter);

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <div class="product-image">
                ${
                  product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""
                }
                <span>${product.icon}</span>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(
                      2
                    )}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${
                      product.id
                    })">Add to Cart</button>
                </div>
            </div>
        `;
    grid.appendChild(card);
  });
}

function filterProducts(category, buttonElement) {
  currentFilter = category;
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (buttonElement) {
    buttonElement.classList.add("active");
  }
  renderProducts();
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  cart.push({ ...product, cartId: Date.now() });
  updateCart();

  // Show animation on button
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = "Added!";
  btn.style.background = "#10b981";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "linear-gradient(135deg, #6366f1, #ec4899)";
  }, 1000);
}

function removeFromCart(cartId) {
  cart = cart.filter((item) => item.cartId !== cartId);
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  if (!cartCount || !cartItems || !totalPrice) return;

  cartCount.textContent = cart.length;

  // Trigger bounce animation
  cartCount.style.animation = "none";
  setTimeout(() => {
    cartCount.style.animation = "bounce 0.5s ease";
  }, 10);

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9rem;">Add some products to get started!</p>
            </div>
        `;
    totalPrice.textContent = "$0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <span class="cart-item-icon">${item.icon}</span>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${
              item.cartId
            })">Remove</button>
        </div>
    `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = "$" + total.toFixed(2);
}

function toggleCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  modal.classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(
    `Thank you for your purchase!\n\nTotal: $${total.toFixed(2)}\nItems: ${
      cart.length
    }\n\nOrder confirmation will be sent to your email.`
  );
  cart = [];
  updateCart();
  toggleCart();
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();

  // Close cart when clicking outside
  const cartModal = document.getElementById("cartModal");
  if (cartModal) {
    cartModal.addEventListener("click", (e) => {
      if (e.target.id === "cartModal") {
        toggleCart();
      }
    });
  }

  // Set first filter as active
  const firstFilterBtn = document.querySelector(".filter-btn");
  if (firstFilterBtn) {
    firstFilterBtn.classList.add("active");
  }
});

// Expose functions to window for HTML onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.filterProducts = filterProducts;
