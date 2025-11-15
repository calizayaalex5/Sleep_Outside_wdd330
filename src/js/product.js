import { getLocalStorage, setLocalStorage, getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter()

const productId = getParam('product')
const category = getParam('category')

const dataSource = new ProductData();

const element = document.querySelector('.product-detail')

const product = new ProductDetails(productId, dataSource, element, category);
product.init();

