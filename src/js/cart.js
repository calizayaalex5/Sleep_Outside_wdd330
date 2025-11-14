import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-total").textContent = "";
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  renderCartTotal(cartItems);
  addRemoveItemListeners();
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item" data-index="${index}">❌ Remove</button>
    </li>`;
}

function renderCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  const totalEl = document.querySelector(".cart-total");
  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function addRemoveItemListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeItemFromCart(index);
    });
  });
}

function removeItemFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

renderCartContents();


