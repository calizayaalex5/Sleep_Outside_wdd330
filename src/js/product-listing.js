import { loadHeaderFooter, getParam  } from "./utils.mjs";
import ProductData from './ProductData.mjs';
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

const dataSource = new ProductData();

const element = document.querySelector('.product-list')

const listing = new ProductList(category, dataSource, element);

listing.init();