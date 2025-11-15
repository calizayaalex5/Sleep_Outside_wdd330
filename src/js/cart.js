import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

// =====================
// RENDER DEL CARRITO
// =====================
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-total").textContent = "";
    return;
  }

  const htmlItems = cartItems.map(item => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  renderCartTotal(cartItems);
  addCartEventListeners();
}


// =====================
// TEMPLATE DEL ITEM
// =====================
function cartItemTemplate(item) {
  const quantity = item.quantity ?? 1;

  return `
    <li class="cart-card divider">

      <a class="cart-card__image">
        <img src="${item.Images.PrimarySmall} alt="${item.Name}">
      </a>

      <div class="cart-card__info">

        <h2 class="card__name">${item.Name}</h2>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>

        <!-- Cantidad -->
        <div class="cart-card__quantity">
          <button class="qty-minus" data-id="${item.Id}">−</button>
          <span class="qty-value">${quantity}</span>
          <button class="qty-plus" data-id="${item.Id}">+</button>
        </div>

        <!-- Subtotal -->
        <p class="cart-card__subtotal">
          Subtotal: $${(item.FinalPrice * quantity).toFixed(2)}
        </p>

        <!-- Remove -->
        <button class="remove-item" data-id="${item.Id}">
          ❌ Remove
        </button>

      </div>
    </li>
  `;
}


// =====================
// TOTAL DEL CARRITO
// =====================
function renderCartTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity ?? 1),
    0
  );

  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
}


// =====================
// EVENTOS PARA +, -, REMOVE
// =====================
function addCartEventListeners() {
  // aumentar cantidad
  document.querySelectorAll(".qty-plus").forEach(btn =>
    btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1))
  );

  // disminuir cantidad
  document.querySelectorAll(".qty-minus").forEach(btn =>
    btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1))
  );

  // eliminar producto
  document.querySelectorAll(".remove-item").forEach(btn =>
    btn.addEventListener("click", () => removeItemFromCart(btn.dataset.id))
  );
}


// =====================
// ACTUALIZAR CANTIDAD
// =====================
function updateQuantity(id, change) {
  let cart = getLocalStorage("so-cart") || [];

  const item = cart.find(p => p.Id === id);
  if (!item) return;

  item.quantity = (item.quantity ?? 1) + change;

  // eliminar si la cantidad llega a 0
  if (item.quantity <= 0) {
    cart = cart.filter(p => p.Id !== id);
  }

  setLocalStorage("so-cart", cart);
  renderCartContents();
}


// =====================
// ELIMINAR PRODUCTO
// =====================
function removeItemFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter(item => item.Id !== id);

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}


// =====================
// INICIALIZAR RENDER
// =====================
renderCartContents();