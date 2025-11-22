import CheckoutProcess from "./CheckoutProcess.mjs";

// El carrito usa la key "so-cart"
const checkout = new CheckoutProcess("so-cart");

// Cuando carga la página → mostrar subtotal
checkout.calculateItemSubtotal();

// Cuando el usuario sale del campo ZIP → calcular total
document.querySelector("#zip").addEventListener("blur", () => {
    if (document.querySelector("#zip").value.length >= 3) {
        checkout.calculateOrderTotal();
    }
});