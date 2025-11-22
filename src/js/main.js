import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter()

const dataSource = new ExternalServices("tents");
const listElement = document.getElementById("product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();