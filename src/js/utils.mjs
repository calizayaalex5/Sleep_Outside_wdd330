// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product');
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlString = list.map(templateFn);

  if (clear){
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}        

/* ============================================================
  renderWithTemplate
  Renders ONE template + optional callback
============================================================ */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = "";

  const clone = template.content.cloneNode(true);

  if (callback) {
    callback(clone, data)
  }

  parentElement.appendChild(clone)
}      
/* ============================================================
  loadTemplate
  Loads an HTML file containing a <template>
============================================================ */
export async function loadTemplate(path) {
  const html = await fetch(path).then((res) => res.text());

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.querySelector("template");
}

/* ============================================================
  loadHeaderFooter
============================================================ */
export async function loadHeaderFooter () {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = qs("#main-header")

  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = qs("#main-footer");

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)
}