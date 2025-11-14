import { qs, getLocalStorage, setLocalStorage, loadTemplate, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;            // ejemplo: "so-cart"
    this.listElement = listElement;
  }

  async init() {
    const list = getLocalStorage(this.key) || [];

    const template = await loadTemplate("/partials/cartItem.html");

    this.renderCartItems(list, template);
    this.renderTotal(list);
  }

  renderCartItems(list, template) {
    // limpiar contenedor
    this.listElement.innerHTML = "";

    list.forEach(item => {
      renderWithTemplate(template, this.listElement, item, (clone, data) => {
        
        clone.querySelector("img").src = data.Image;
        clone.querySelector("img").alt = data.Name;

        clone.querySelector(".card__name").textContent = data.Name;
        
        clone.querySelector(".cart-card__color").textContent =
          data.Colors?.[0]?.ColorName || "";

        clone.querySelector(".cart-card__price").textContent = `$${data.FinalPrice}`;
      });
    });
  }

  renderTotal(list) {
    const total = list.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
    qs("#cart-total").textContent = `Total: $${total.toFixed(2)}`;
  }
}