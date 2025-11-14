import { loadHeaderFooter } from "./utils.mjs";
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter()

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

console.log("Category:", category); 

const dataSource = new ProductData("tents");
const listElement = document.getElementById("product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
