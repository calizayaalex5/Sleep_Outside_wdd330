import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { baseURL } from "./ProductData.mjs";

loadHeaderFooter();

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        
        document
          .getElementById("addToCart")
          .addEventListener("click", () => this.addProductToCart());
    }

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        
        const existingItem = cartItems.find(item => item.Id === this.product.Id)
        if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
        const itemToSave = {
            Id: this.product.Id,
            Name: this.product.Name,
            NameWithoutBrand: this.product.NameWithoutBrand,
            FinalPrice: this.product.FinalPrice,
            Colors: this.product.Colors,
            Images: this.product.Images,
            quantity: 1
        };

        cartItems.push(itemToSave);
        
        }

        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        ProductDetailsTemplate(this.product);   
    }
}


function ProductDetailsTemplate(product) {
    document.querySelector('h3').textContent = product.Brand.Name;
    document.querySelector('h2').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}