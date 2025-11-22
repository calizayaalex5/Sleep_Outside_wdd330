import { loadHeaderFooter, getParam, renderBreadcrumb } from "./utils.mjs";
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter()

let category = getParam("category");
if (!category) {
  category = "tents";
}

const formattedCategory = category
  .replace("-", " ")
  .replace(/\b\w/g, c => c.toUpperCase());

document.querySelector("h2").textContent = `Top Products: ${formattedCategory}`;

const dataSource = new ExternalServices();

const element = document.querySelector('.product-list')

const listing = new ProductList(category, dataSource, element);

const products = await dataSource.getData(category);

renderBreadcrumb(`${formattedCategory} → (${products.length} items)`);

listing.init();