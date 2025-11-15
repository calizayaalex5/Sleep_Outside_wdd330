import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
  </li>`
}


export default class ProductList {
    constructor(catagory, dataSource, listElement) {
        this.catagory = catagory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.catagory);
        this.renderList(list);
        document.querySelector(".title").textContent = this.catagory;
    }

    renderList(list) {
         renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}

