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
  return urlParams.get(param);
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

/* ============================================================
  Alert Messagess ERROR IN CHECKING
============================================================ */
export function alertMessage(message, scroll = true) {
  const oldAlert = document.querySelector(".custom-alert")
  if (oldAlert) oldAlert.remove()

  //create alert
  const div = document.createElement("div")
  div.classList.add("custom-alert")
  div.innerHTML = `
    <p>${message}</p>
    <button class='alert-close'>✖</button>
  `

  const main = document.querySelector("main")
  main.prepend(div)

  div.querySelector(".alert-close").addEventListener("click", () => {
    div.remove();
  })

  if (scroll) {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    })
  }
}


/* ============================================================
  Alert Messagess ADD ITEMS TO CART
============================================================ */
export function alertAddToCart(message) {
  const oldAlert = document.querySelector(".cart-alert");
  if (oldAlert) oldAlert.remove();

  const div = document.createElement("div");
  div.classList.add("cart-alert", "cart-slide");

  div.innerHTML = `
    <p>🛒 ${message}</p>
  `;

  document.body.appendChild(div);

  // auto-hide
  setTimeout(() => {
    div.classList.add("cart-fade-out");
    setTimeout(() => div.remove(), 250);
  }, 2000);
}

/* ============================================================
  BREADCUMBS
============================================================ */
export function renderBreadcrumb(text = "") {
  const breadcrumb = document.querySelector("#breadcrumb");
  if (!breadcrumb) return;

  if (!text) {
    breadcrumb.innerHTML = ""; // home → nothing
    return;
  }

  breadcrumb.innerHTML = `<span>${text}</span>`;
}

/* =========================================================
ALERT NEWSLETTER — floating, elegant & minimal
============================================================ */
export function alertNewsletter(message) {
  const existing = document.querySelector(".newsletter-alert");
  if (existing) existing.remove();

  const box = document.createElement("div");
  box.classList.add("newsletter-alert");
  box.innerHTML = `
    <span class="icon">✦</span>
    <p>${message}</p>
    <button class="close-alert-newsletter">✖</button>
  `;

  document.body.appendChild(box);

  setTimeout(() => {
    box.classList.add("show");
  }, 10);


  box.querySelector(".close-alert-newsletter").addEventListener("click", () => {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 300);
  });

  setTimeout(() => {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 300);
  }, 3000);
}

