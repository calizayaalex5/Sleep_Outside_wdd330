import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart");

checkout.calculateItemSubtotal();

document.querySelector("#zip").addEventListener("blur", () => {
    if (document.querySelector("#zip").value.length >= 3) {
        checkout.calculateOrderTotal();
    }
});

//send form
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const valid = form.checkValidity()
    
    form.reportValidity()
    if (!valid) {
        console.warn("Form validation failed")
        return;
    }
        
    checkout.checkout(form)
});