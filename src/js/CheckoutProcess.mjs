import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key) {
        this.cartKey = key;
        this.list = getLocalStorage(this.cartKey) || [];

        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    // ========= 1. CALCULAR Y MOSTRAR SUBTOTAL =========
    calculateItemSubtotal() {
        this.subtotal = this.list.reduce((sum, item) => {
        const qty = item.quantity ?? 1;
        return sum + item.FinalPrice * qty;
        }, 0);

        document.querySelector("#summary-subtotal").textContent =
        `Subtotal: $${this.subtotal.toFixed(2)}`;
    }

    // ========= 2. CALCULAR TAX, SHIPPING, TOTAL =========
    calculateOrderTotal() {
        // Tax: 6%
        this.tax = this.subtotal * 0.06;

        // Shipping: $10 + $2 por cada producto adicional
        const totalItems = this.list.reduce((sum, item) => {
        return sum + (item.quantity ?? 1);
        }, 0);

        this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

        // Order Total
        this.orderTotal = this.subtotal + this.tax + this.shipping;

        document.querySelector("#summary-tax").textContent =
        `Tax (6%): $${this.tax.toFixed(2)}`;

        document.querySelector("#summary-shipping").textContent =
        `Shipping: $${this.shipping.toFixed(2)}`;

        document.querySelector("#summary-total").textContent =
        `Total: $${this.orderTotal.toFixed(2)}`;
    }
}