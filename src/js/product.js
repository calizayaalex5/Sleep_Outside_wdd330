import { getLocalStorage, setLocalStorage, getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter()

const productId = getParam('product')
const category = getParam('category')

const dataSource = new ExternalServices();

const element = document.querySelector('.product-detail')

const product = new ProductDetails(productId, dataSource, element, category);
product.init();

