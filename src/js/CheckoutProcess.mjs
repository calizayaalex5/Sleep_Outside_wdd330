import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor(key) {
        this.cartKey = key;
        this.list = getLocalStorage(this.cartKey) || [];

        this.services = new ExternalServices()

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

    // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
    packageItems(items) {
        return items.map(item => ({
            id: item.Id || item.id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity ?? 1
        }));
    }

    formDataToJSON(formElement) {
        const formData = new FormData(formElement)
        const convertedJSON = {}

        formData.forEach((value, key) => {
            convertedJSON[key] = value
        })

        return convertedJSON
    }

    async checkout(form) {
        let order = this.formDataToJSON(form);

        if (order.expiration && order.expiration.includes("-")) {
            const [year, month] = order.expiration.split("-");
            order.expiration = `${month}/${year.slice(2)}`;
        }

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;
        order.items = this.packageItems(this.list);

        console.log("Order Ready to Send:", order);

        try {
            const response = await this.services.submitOrder(order);

            console.log("SERVER RESPONSE:", response);
            alert("Order Submitted successfully!");

            localStorage.removeItem("so-cart");

            window.location.href = "./success.html";
        } catch (err) {
            console.error("Checkout error:", err);

            if (err.details) {
                const messages = Object.entries(err.details)
                    .map(([field, msg]) => `${field}: ${msg}`)
                    .join("<br>");

                alertMessage(`
                    Order failed:<br>
                    ${messages}<br>
                    Status: ${err.status}
                `);
            } 
            else {
                alertMessage(`Order failed: ${err.message}`);
  }
            
        }
    }
}

