import { alertNewsletter } from "./utils.mjs";

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("newsletter-email").value;

    if (!email.includes("@") || !email.includes(".")) {
        alertNewsletter("⚠️ Please enter a valid email.");
        return;
    }

    alertNewsletter("🎉 You are now subscribed to our Newsletter!");
    this.reset();
});
